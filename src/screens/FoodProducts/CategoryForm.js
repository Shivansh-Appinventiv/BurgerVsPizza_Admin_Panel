import React from "react";
import { Form, Formik } from "formik";
import Input from "../../components/Controls/Input";
import Schema from "../../schema";
import { Divider, makeStyles } from "@material-ui/core";
import CButton from "../../components/Controls/Button/containedButton";
import { addCategory, getProducts } from "../../redux/productsSlice";
import { useDispatch } from "react-redux";
import CheckBox from "../../components/Controls/CheckBox";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: "16px",
  },
  formHeader: {
    height: "40px",
    padding: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  crossStyle: {
    background: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: "25px",
  },
  divider: {
    margin: "10px -16px",
  },
  inputStyle: {
    margin: "10px 0",
  },
}));

export default function CategoryForm(props) {
  const { setOpen } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialValues = {
    category: "",
    categoryImage: "",
    vegOrNonVeg: false,
  };
  const onSubmit = (values, props) => {
    console.log(values);
    props.resetForm();
    setOpen(false);
    dispatch(addCategory(values));
    dispatch(getProducts());
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={Schema.CategorySchema}
        onSubmit={onSubmit}
      >
        <Form className={classes.formContainer}>
          <div className={classes.formHeader}>
            <h2>{"Category Form"}</h2>
            <button
              type={"reset"}
              className={classes.crossStyle}
              onClick={closeModal}
            >
              &#10006;
            </button>
          </div>
          <Divider className={classes.divider} />
          <Input
            name={"category"}
            label={"Enter your Category"}
            styleClass={classes.inputStyle}
          />
          <Input
            name={"categoryImage"}
            label={"Enter Category Image Url"}
            styleClass={classes.inputStyle}
          />
          <CheckBox
            name={"vegOrNonVeg"}
            label={"Veg/Non-veg or not?"}
            legend={"Veg/Non-veg"}
          />
          <Divider className={classes.divider} />
          <CButton type={"submit"}>{"Add Category"}</CButton>
        </Form>
      </Formik>
    </div>
  );
}
