import React from "react";
import { Form, Formik } from "formik";
import Schema from "../../schema";
import Images from "../../assets";
import Input from "../../components/Controls/Input";
import Button from "../../components/Controls/Button/containedButton";
import { makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../redux/loginSlice";

const useStyle = makeStyles((theme) => ({
  screenContainer: {
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    [theme.breakpoints.up("md")]: {
      padding: "3rem 2rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "5rem 0",
      width: "auto",
    },
  },
  outlineContainer: {
    padding: "2rem",
    backgroundColor: "rgba(245, 104, 48, 0.9)",
    borderRadius: "2rem",
    display: "flex",
    border: "2px solid rgba(245, 104, 48, 0.9)",
    flexDirection: "column",
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
      maxWidth: "1400px",
      margin: "0 auto",
    },
  },
  leftWrapper: {
    width: "100%",
    marginBottom: "2rem",
    [theme.breakpoints.up("md")]: {
      marginBottom: "2rem",
      marginRight: "1rem",
    },
    [theme.breakpoints.up("lg")]: {
      width: "70%",
      marginRight: "1rem",
      marginBottom: "0",
    },
  },
  rightWrapper: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "30%",
    },
  },
  coverImg: {
    borderRadius: "2rem",
    width: "100%",
    minHeight: "100%",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "100%",
    },
  },
  formStyle: {
    background: "white",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    padding: "0 1rem",
    borderRadius: "2rem",
    minHeight: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    textAlign: "center",
    [theme.breakpoints.up("lg")]: {
      minHeight: "100%",
    },
  },
  logoTitle: {
    textAlign: "center",
    fontFamily: `"Acme", sans-serif`,
    fontSize: "2.5rem",
    background:
      "-webkit-linear-gradient(left, green 20%, rgba(255, 166, 0), red)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1rem",
  },
  loginTitle: {
    textAlign: "center",
    color: "rgba(245, 104, 48, 0.9)",
    fontFamily: `"Acme", sans-serif`,
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  inputDiv: {
    margin: "0.5rem 0",
    "& .MuiInputBase-root": {
      fontSize: "0.80rem",
    },
    "& .MuiFormLabel-root": {
      fontSize: "0.80rem",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "green",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "0.75rem",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
  },
  registerLink: {
    fontSize: "0.80rem",
  },
}));

export default function Login() {
  const classes = useStyle();

  const dispatch = useDispatch();
  const { loginStatus } = useSelector((state) => state.login);

  const history = useHistory();

  const loginValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    dispatch(authenticateUser(values));
  };

  React.useEffect(() => {
    if (loginStatus === "success") {
      history.push("/dashboard");
    }
  });

  return (
    <div className={classes.screenContainer}>
      <div className={classes.outlineContainer}>
        <div className={classes.leftWrapper}>
          <img
            src={Images.LoginImages.coverBurgerVsPizza}
            alt={"coverBurgerVsPizza"}
            width={"auto"}
            height={"auto"}
            className={classes.coverImg}
          />
        </div>
        <div className={classes.rightWrapper}>
          <Formik
            initialValues={loginValues}
            validationSchema={Schema.LoginSchema}
            onSubmit={onSubmit}
          >
            <Form className={classes.formStyle}>
              <Typography
                variant={`h1`}
                className={classes.logoTitle}
              >{`BurgerVsPizza`}</Typography>
              <Typography
                variant={`h2`}
                className={classes.loginTitle}
              >{`Admin Login`}</Typography>
              <Input
                name="email"
                label={"Email"}
                styleClass={classes.inputDiv}
              />
              <Input
                name="password"
                label={"Password"}
                styleClass={classes.inputDiv}
              />
              <Button type={"submit"}>{"Login"}</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
