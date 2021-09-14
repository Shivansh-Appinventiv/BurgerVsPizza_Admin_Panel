import React from "react";
import Schema from "../../schema";
import DropDown from "../../components/Controls/Select";
import { Divider, makeStyles } from "@material-ui/core";
import { Form, Formik } from "formik";
import Input from "../../components/Controls/Input";
import CButton from "../../components/Controls/Button/containedButton";
import FoodLabelSelect from "./FoodLabelSelect";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, editProductInfo } from "../../redux/productsSlice";

const useStyles = makeStyles((theme) => ({
  selectContainer: {
    width: "100%",
  },
  select: {
    width: "100%",
    margin: "10px 0",
  },
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

const itemMarks = [
  {
    value: "veg",
    label: (
      <FoodLabelSelect
        labelImage={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/768px-Indian-vegetarian-mark.svg.png"
        }
        alt={"vegIcon"}
        label={"Veg"}
      />
    ),
  },
  {
    value: "nonVeg",
    label: (
      <FoodLabelSelect
        labelImage={
          "https://www.vhv.rs/dpng/d/437-4370761_non-veg-icon-non-veg-logo-png-transparent.png"
        }
        alt={"nonVegIcon"}
        label={"Non-Veg"}
      />
    ),
  },
];

export default function ItemForm(props) {
  const classes = useStyles();
  const { options, setOpen, savedData,setComponent } = props;

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  let [selectMark, setSelectMark] = React.useState(itemMarks[0]);

  const initialValues = {
    itemName: "",
    itemPhoto: "",
    itemPrice: 0,
  };

  const onSubmit = (values, submitProps) => {
    console.log(values);
    submitProps.resetForm();
    products.forEach((item) => {
      //console.log(item, selectedOption.value);
      if (item.data.category === selectedOption.value) {
        dispatch(
          addProduct({
            item,
            itemName: values.itemName,
            itemPhoto: values.itemPhoto,
            itemPrice: values.itemPrice,
            selectMark:
              selectedOption.value === "Burgers" ||
              selectedOption.value === "Pizzas"
                ? selectMark
                : null,
          })
        );
      }
    });

    setOpen(false);
  };

  //console.log(options, editCategory, "ItemForm");

  const closeModal = () => {
    setOpen(false);
    setComponent(null);
    dispatch(editProductInfo(null));
  };

  console.log(selectedOption, products, "ItemForm");

  const selectStyles = {
    input: (styles) => ({ ...styles, color: "transparent" }),
    menu: (styles) => ({ ...styles, zIndex: "2" }),
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={savedData?.itemInfo || initialValues}
        validationSchema={Schema.ItemSchema}
        onSubmit={onSubmit}
      >
        <Form className={classes.formContainer} autoComplete={"off"}>
          <div className={classes.formHeader}>
            <h2>{"Food Item Form"}</h2>
            <button
              type={"reset"}
              className={classes.crossStyle}
              onClick={closeModal}
            >
              &#10006;
            </button>
          </div>
          <Divider className={classes.divider} />
          <DropDown
            name={"foodCategory"}
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            containerStyle={classes.selectContainer}
            selectStyle={classes.select}
            styles={selectStyles}
            //handleSelect={handleSelect}
          />
          {selectedOption?.value === "Burgers" ||
          selectedOption?.value === "Pizzas" ? (
            <DropDown
              name={"itemMark"}
              options={itemMarks}
              selectedOption={selectMark}
              setSelectedOption={setSelectMark}
              containerStyle={classes.selectContainer}
              selectStyle={classes.select}
              styles={selectStyles}
              //handleSelect={handleSelect}
            />
          ) : null}
          <Input
            name={"itemName"}
            label={"Enter Item Name"}
            styleClass={classes.inputStyle}
          />

          <Input
            name={"itemPhoto"}
            label={"Enter Image Url"}
            styleClass={classes.inputStyle}
          />
          <Input
            name={"itemPrice"}
            label={"Enter Price Value"}
            styleClass={classes.inputStyle}
          />
          <Divider className={classes.divider} />
          <CButton type={"submit"}>{"Add Item"}</CButton>
        </Form>
      </Formik>
    </div>
  );
}
