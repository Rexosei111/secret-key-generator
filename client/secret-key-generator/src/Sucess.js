import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    alert: {
        backgroundColor: "#424242"
    }
}))
function Sucess({open, setopen}) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setopen(false);
      };

      const classes = useStyles()

  return (

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" className={classes.alert}>
          Key Copied To Clipboard
        </Alert>
      </Snackbar>
  );
}

export default Sucess;
