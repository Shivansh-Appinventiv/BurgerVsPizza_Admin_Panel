import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { db } from "../../authentication/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../redux/orderSlice";
import DropDown from "../../components/Controls/Select";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    paddingLeft: "8px",
    paddingTop: "80px",
    paddingRight: "8px",
    [theme.breakpoints.up("md")]: {
      paddingLeft: "308px",
    },
  },
  orderWrapper: {
    width: "100%",
    // height: "50px",
    // background: "black"
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    background: "whitesmoke",
    margin: "20px 0",
  },
  orderHeader: {
    width: "100%",
    minHeight: "100px",
    display: "flex",
    justifyContent: "space-between",
  },
  orderHeaderItems: {
    width: "33%",
    textAlign: "left",
    padding: "5px 10px",
    background: "white",
    borderRadius: "10px",
  },
  orderDetails: {
    display: "flex",
    justifyContent: "normal",
    alignItems: "center",
    margin: "8px 0",
  },
  orderBodyItems: {
    margin: "10px",
  },
  orderImgTextContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectContainer: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  select: {
    [theme.breakpoints.up("sm")]: {
      width: "250px",
    },
  },
}));

const orderStatus = [
  {
    value: "select",
    label: <Typography variant={"subtitle1"}>{"Select Status"}</Typography>,
  },
  {
    value: "accept",
    label: <Typography variant={"subtitle1"}>{"Accept Offer"}</Typography>,
  },
  {
    value: "reject",
    label: <Typography variant={"subtitle1"}>{"Reject Offer"}</Typography>,
  },
  {
    value: "prepare",
    label: (
      <Typography variant={"subtitle1"}>{"Food is being Prepared"}</Typography>
    ),
  },
  {
    value: "picked",
    label: (
      <Typography variant={"subtitle1"}>
        {"Order is picked by valet"}
      </Typography>
    ),
  },
  {
    value: "deliver",
    label: <Typography variant={"subtitle1"}>{"Food is delivered"}</Typography>,
  },
];

export default function Orders() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  const [selectedOption, setSelectedOption] = React.useState(orderStatus[0]);

  // Setting  Date as Document Id in d_m_yyyy format

  const today = new Date();
  const docId = `${today.getDate()}_${
    today.getMonth() + 1
  }_${today.getFullYear()}`;

  console.log(docId);
  React.useEffect(() => {
    db.collection("orders")
      .doc(docId)
      .onSnapshot((doc) => {
        console.log(doc.data());
        if (doc.data()) {
          //console.log({ ...doc.data().orders });
          dispatch(setOrders(doc.data()));
        }
      });
  }, [dispatch, docId]);

  console.log(orders);
  const rupeeSymbol =
    "https://im.indiatimes.in/content/2020/Jul/indian-currency-389006_1920_5f154735cab54.jpg";

  const selectStyles = {
    input: (styles) => ({ ...styles, color: "transparent" }),
  };

  return (
    <div className={classes.container}>
      <div></div>
      {[...orders].reverse().map((order) => {
        return (
          <div className={classes.orderWrapper} key={order?.orderId}>
            <div className={classes.orderHeader}>
              <div className={classes.orderHeaderItems}>
                <Typography variant={"subtitle1"}>{"User"}</Typography>
                <Typography variant={"h5"}>{order?.name}</Typography>
              </div>
              <div className={classes.orderHeaderItems}>
                <Typography variant={"subtitle1"}>{"Address"}</Typography>
                <Typography variant={"h6"}>{order?.address}</Typography>
              </div>
              <div className={classes.orderHeaderItems}>
                <Typography variant={"subtitle1"}>{"Order Id "}</Typography>
                <Typography variant={"h6"}>{order.orderId}</Typography>
              </div>
            </div>
            <div className={classes.orderBody}>
              <div className={classes.orderDetails}>
                {Object.values(order?.items)?.map((item) => {
                  return (
                    <div
                      className={classes.orderBodyItems}
                      key={`${order?.name}_${item?.name}`}
                    >
                      <div>
                        <img
                          src={item?.photo}
                          alt={item?.name}
                          height={200}
                          width={"auto"}
                        />
                      </div>
                      <div className={classes.orderImgTextContainer}>
                        <Typography variant={"h6"}>
                          {item?.quantity} &#10006;
                        </Typography>
                        <div
                          style={{
                            width: "45px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <img
                            src={rupeeSymbol}
                            alt={"RupeeSymbol"}
                            height={25}
                          />
                          <Typography variant={"h6"}>{item?.price}</Typography>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "white",
                  padding: "5px 10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    //border: "1px solid red",
                    width: "25%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant={"h6"}>{"Order Status"}</Typography>
                  <DropDown
                    name={"orderStatus"}
                    options={orderStatus}
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                    containerStyle={classes.selectContainer}
                    selectStyle={classes.select}
                    styles={selectStyles}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={rupeeSymbol}
                    alt={"RupeeSymbol"}
                    height={25}
                    style={{ marginRight: "5px" }}
                  />
                  <Typography variant={"h6"}>
                    {"Total price : "}
                    {order?.orderPrice}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
