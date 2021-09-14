import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";

import { useDispatch } from "react-redux";
import { editProductInfo } from "../../../redux/productsSlice";

const useStyles = makeStyles({
  root: {
    margin: "10px 0",
    //maxWidth: 380,
    boxShadow: "0px 0px 5px 0px rgba(245, 104, 48, 1)",
  },
  media: {
    minHeight: 200,
  },
  title: {
    color: "rgba(245, 104, 48, 1)",
    fontFamily: `"Acme",sans-serif`,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  cardActionArea: {
    background: "transparent",
    "&:hover": {
      background: "transparent",
    },
  },
  cardAction: {
    fontFamily: `"Acme",sans-serif`,
    fontSize: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartBtn: {
    fontFamily: `"Acme",sans-serif`,
    fontSize: "12px",
    color: "rgba(245, 104, 48, 1)",
    borderColor: "rgba(245, 104, 48, 1)",
    "&.MuiButton-outlined": {
      paddingTop: "2px",
      paddingBottom: "2px",
    },
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const { name, photo, price, type, category } = props;
  //console.log(onClick);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      editProductInfo({
        itemInfo: { itemName: name, itemPhoto: photo, itemPrice: price },
        type: type?.name,
        category: category,
      })
    );
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia className={classes.media} image={photo} title={name} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardAction}>
        <div
          style={{
            display: "flex",
            width: "100px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>&#x20b9; {price}</div>
          {type && <img src={type.url} alt={type.name} height={20} width={20} />}
        </div>
        <Button
          variant={"outlined"}
          endIcon={<EditIcon fontSize={"small"} />}
          className={classes.cartBtn}
          onClick={handleClick}
        >
          {"Edit"}
        </Button>
      </CardActions>
    </Card>
  );
}
