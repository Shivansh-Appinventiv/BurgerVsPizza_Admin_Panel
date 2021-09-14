import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  categorySubTitle: {
    textTransform: "capitalize",
  },
}));

export default function ProductsDisplay(props) {
  const classes = useStyles();
  const { subTitle, items, type } = props;

  let typeVeg = {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png",
    name: "veg",
  };

  let typeNonVeg = {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/1200px-Non_veg_symbol.svg.png",
    name: "nonVeg",
  };

  return (
    <>
      <Grid item xs={12} style={{ margin: "10px 0 20px 0" }}>
        <Typography variant={"h6"} className={classes.categorySubTitle}>
          {type ? `${type} ${subTitle}` : null}
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={2} style={{ margin: "0" }}>
        {items?.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={item.itemName}>
              <Card
                name={item.itemName}
                photo={item.itemPhoto}
                price={item.itemPrice}
                category={subTitle}
                type={type ? (type === "veg" ? typeVeg : typeNonVeg) : null}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
