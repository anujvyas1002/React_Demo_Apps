import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { makeStyles } from "@mui/material/styles";
import Portal from "@mui/material/Portal";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { Constants } from "./Constants";
// import { ERROR_MESSAGE } from './Constants';
// import { SUCCESS_MESSAGE } from './Constants';

const useStyles = makeStyles(() => ({
  anchorOrigin: {
    marginRight: "5%",
  },
}));

export const ToasterMessage = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.openToast);
  }, [props.openToast]);

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        {t("OK")}
      </Button>
    </React.Fragment>
  );

  return (
    <Portal>
      <Snackbar
        open={open}
        autoHideDuration={props.timeout || Constants.SNACKBAR_AUTO_HIDE_TIME}
        anchorOrigin={props.snackbarOrigin}
        classes={{ anchorOriginBottomRight: classes.anchorOrigin }}
        onClose={handleClose}
        message={props.toastMessage}
        action={props.showOKAction ? action : null}
      />
    </Portal>
  );
};
