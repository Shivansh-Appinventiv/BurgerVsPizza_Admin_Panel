import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  btnStyle: {
    //textAlign: "right",
    width: "50%",
    "& .MuiButton-outlined": {
      borderColor: "rgba(245, 104, 48, 0.7)",
    },
    "& .MuiButton-root": {
      color: "rgba(245, 104, 48, 1)",
      fontFamily: `"Acme",sans-serif`,
    },
    [theme.breakpoints.up("md")]:{
      width: "auto"
    }
  },
}));

export default function OutlinedButton(props) {
  const { children, onClick, btnDivStyle, ...rest } = props;
  const classes = useStyle();
  const attributes = {
    variant: "outlined",
    color: "default",
    ...rest,
    onClick,
  };
  return (
    <div className={classes.btnStyle} style={btnDivStyle}>
      <Button {...attributes}>{children}</Button>
    </div>
  );
}
