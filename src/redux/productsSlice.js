import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../authentication/firebase";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await db.collection("/products").get();
    var products = [];
    res.forEach((cat) => {
      var id = cat.id;
      var data = cat.data();
      products.push({ id, data });
    });
    console.log(products);
    return products;
  }
);

export const addCategory = createAsyncThunk(
  "products/addCategory",
  async (category) => {
    if (category.vegOrNonVeg) {
      var result = await db.collection("/products").add({
        ...category,
        products: {
          veg: [],
          nonVeg: [],
        },
      });
    } else {
      result = await db.collection("/products").add({
        ...category,
        products: null,
      });
    }
    //console.log(result.id);
    return result;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (
    { item, itemName, itemPhoto, itemPrice, selectMark },
    { dispatch }
  ) => {
    console.log(item, selectMark, item.data.products[selectMark.value]);
    if (item.data.category === "Burgers" || item.data.category === "Pizzas") {
      await db
        .collection(`products`)
        .doc(item.id)
        .set(
          {
            products: {
              ...item.data.products,
              [selectMark.value]: [
                ...item.data.products[selectMark.value],
                {
                  itemName,
                  itemPhoto,
                  itemPrice,
                  isAvailable: false,
                },
              ],
            },
          },
          { merge: true }
        );
    } else {
      await db
        .collection(`products`)
        .doc(item.id)
        .set(
          {
            products: [
              ...item.data.products,
              {
                itemName,
                itemPhoto,
                itemPrice,
                isAvailable: false,
              },
            ],
          },
          { merge: true }
        );
    }
    dispatch(getProducts());
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    addCategoryStatus: null,
    getProductStatus: null,
    addProductStatus: null,
    savedData: null,
  },
  extraReducers: {
    [addCategory.pending]: (state, action) => {
      state.addCategoryStatus = "sending";
    },
    [addCategory.fulfilled]: (state, action) => {
      state.addCategoryStatus = "success";
    },
    [addCategory.failed]: (state, action) => {
      state.addCategoryStatus = "failed";
    },
    [getProducts.pending]: (state, action) => {
      state.getProductStatus = "loading";
    },
    [getProducts.fulfilled]: (state, action) => {
      state.getProductStatus = "success";
      state.products = [...action.payload];
    },
    [getProducts.rejected]: (state, action) => {
      state.getProductStatus = "failed";
    },
    [addProduct.pending]: (state, action) => {
      state.addProductStatus = "loading";
    },
    [addProduct.fulfilled]: (state, action) => {
      state.addProductStatus = "success";
    },
    [addProduct.rejected]: (state, action) => {
      state.addProductStatus = "failed";
    },
  },
  reducers: {
    setFoodItems: (state, action) => {
      state.products = [...action.payload];
    },
    editProductInfo: (state, action) => {
      state.savedData = action.payload;
    },
  },
});

export const { setFoodItems, editProductInfo } = productSlice.actions;

export default productSlice.reducer;
