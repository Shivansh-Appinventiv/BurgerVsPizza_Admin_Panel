import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Required!").email("Invalid Email Address"),
  password: Yup.string().required("Required!"),
});

const CategorySchema = Yup.object().shape({
  category: Yup.string().required("Add a category"),
  categoryImage: Yup.string().required("Add Image url"),
});

const ItemSchema = Yup.object().shape({
  itemName: Yup.string().required("Name Required!"),
  itemPhoto: Yup.string().required("Url Required!"),
  itemPrice: Yup.number()
    .typeError("Item Price should be number")
    .required("Price Required!"),
});

const Schema = {
  LoginSchema,
  CategorySchema,
  ItemSchema,
};

export default Schema;
