import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  selectLabelContainer: {
    //backgroundColor: "white",
    display: "flex",
    justifyContent: "normal",
    alignItems: "center",
  },
}));

export default function FoodLabelSelect(props) {
  const classes = useStyles();
  const { labelImage, alt, label } = props;
  return (
    <div className={classes.selectLabelContainer}>
      <img src={labelImage} alt={alt} height={25} width={25} />
      <span style={{ marginLeft: "5px"}}>{label}</span>
    </div>
  );
}
