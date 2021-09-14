import React from "react";
import Dialog from "@material-ui/core/Dialog";
//import DialogContentText from "@material-ui/core/DialogContentText";

import Slide from "@material-ui/core/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal(props) {
  const { children, open, setOpen } = props;
  //console.log(item,open)

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {children}
      </Dialog>
    </div>
  );
}
