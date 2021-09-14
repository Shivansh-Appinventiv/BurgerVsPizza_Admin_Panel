import React from "react";
import Images from "../../assets/index";
import FoodLabelSelect from "./FoodLabelSelect";
import OButton from "../../components/Controls/Button/outlinedButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  Grid,
  makeStyles,
  Typography,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Modal from "../../components/Modal";
import CategoryForm from "./CategoryForm";
import DropDown from "../../components/Controls/Select";
import ItemForm from "./ItemForm";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productsSlice";
import ProductsDisplay from "./ProductsDisplay";
//import Card from "../../components/Card";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    paddingLeft: "8px",
    paddingTop: "72px",
    paddingRight: "8px",
    [theme.breakpoints.up("md")]: {
      paddingLeft: "308px",
    },
  },
  selectContainer: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  select: {
    [theme.breakpoints.up("sm")]: {
      width: "150px",
    },
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    //border: "1px solid red",
    [theme.breakpoints.up("sm")]: {
      alignItems: "center",
      flexDirection: "row",
    },
  },
  btnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
    [theme.breakpoints.up("sm")]: {
      width: "45%",
      flexDirection: "row",
      marginTop: "0px",
    },
    [theme.breakpoints.up("md")]: {
      width: "43%",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

// itemForm Category Options
const itemFormOptions = (options) => {
  //console.log("itemFormOPtions", options);
  let arr = [];
  options?.forEach((item, index) => {
    if (index !== 0) {
      arr.push(item);
    }
  });
  return arr;
};

// DropDown array of Image Select

const createFoodCategories = (products, foodCategories) => {
  products?.forEach((item) => {
    foodCategories.push({
      value: item.data?.category,
      label: (
        <FoodLabelSelect
          labelImage={item.data?.categoryImage}
          alt={`${item.data?.category}_Icon`}
          label={item.data?.category}
        />
      ),
    });
  });
  //console.log("createFoodCategories", products, foodCategories);
  return foodCategories;
};

// setOptions among Categories

const getItems = (products, selectedOption) => {
  let items = [];
  if (selectedOption.value === "all") {
    items = [...products];
  } else {
    products?.forEach((item) => {
      if (item.data.category === selectedOption.value) {
        items = [item];
      }
    });
  }
  return items;
};

export default function FoodProducts() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { products, getProductStatus, savedData } = useSelector(
    (state) => state.products
  );

  let foodCategories = [
    {
      value: "all",
      label: (
        <FoodLabelSelect
          labelImage={Images.FoodProductsImages.allSelect}
          alt={"allIcon"}
          label={"All"}
        />
      ),
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [component, setComponent] = React.useState(null);
  const [array, setArray] = React.useState(foodCategories);
  const [selectedOption, setSelectedOption] = React.useState(foodCategories[0]);
  const [items, setItems] = React.useState(null);

  //console.log("Array", array);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  React.useEffect(() => {
    if (getProductStatus === "success") {
      setArray(createFoodCategories(products, foodCategories));
      setItems(getItems(products, selectedOption));
    }
  }, [getProductStatus, selectedOption, products]);

  React.useEffect(() => {
    if (savedData) {
      setComponent(
        <ItemForm
          setOpen={setOpen}
          options={itemFormOptions(array)}
          savedData={savedData}
          setComponent={setComponent}
        />
      );
      setOpen(true);
      console.log("hjhkh");
    }
  }, [savedData, array]);

  const addCategory = () => {
    setComponent(<CategoryForm setOpen={setOpen} />);
    setOpen(true);
  };

  const addFoodItem = () => {
    setComponent(
      <ItemForm
        setOpen={setOpen}
        options={itemFormOptions(array)}
        setComponent={setComponent}
      />
    );
    setOpen(true);
  };

  //console.log(items, "index(173)");
  //console.log(savedData);

  const selectStyles = {
    input: (styles) => ({ ...styles, color: "transparent" }),
  };

  return (
    <div className={classes.container}>
      <Backdrop
        className={classes.backdrop}
        open={getProductStatus === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.header}>
        <DropDown
          name={"foodCategory"}
          options={array}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          containerStyle={classes.selectContainer}
          selectStyle={classes.select}
          styles={selectStyles}
        />
        <div className={classes.btnContainer}>
          <OButton
            endIcon={<AddCircleOutlineIcon />}
            onClick={() => addCategory}
            btnDivStyle={{ textAlign: "left" }}
          >
            {"Category"}
          </OButton>
          <OButton
            endIcon={<AddCircleOutlineIcon />}
            onClick={() => addFoodItem()}
            btnDivStyle={{ textAlign: "right" }}
          >
            {"Food Item"}
          </OButton>
          <Modal open={open} setOpen={setOpen}>
            {component}
          </Modal>
        </div>
      </div>
      <div>
        <Grid container>
          {items?.map((item) => {
            if (item.data.vegOrNonVeg) {
              return (
                <Grid container item xs={12} key={item.data.category}>
                  <Grid item xs={12} style={{ margin: "10px 0 20px 0" }}>
                    <Typography variant={"h4"}>{item.data.category}</Typography>
                  </Grid>
                  <ProductsDisplay
                    subTitle={item.data.category}
                    type={"veg"}
                    items={item.data.products?.veg}
                  />
                  <ProductsDisplay
                    subTitle={item.data.category}
                    type={"nonVeg"}
                    items={item.data.products?.nonVeg}
                  />
                </Grid>
              );
            } else {
              return (
                <Grid container item xs={12} key={item.data.category}>
                  <Grid item xs={12} style={{ margin: "10px 0 20px 0" }}>
                    <Typography variant={"h4"}>{item.data.category}</Typography>
                  </Grid>
                  <ProductsDisplay
                    subTitle={item.data.category}
                    type={null}
                    items={item.data.products}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </div>
    </div>
  );
}
