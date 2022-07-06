import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

import { removeEmployee, STATUSES } from "../../store/employeeSlice";

const RemoveEmployee = (props) => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { employees, status } = useSelector((state) => state.employee);

  //conformation box open
  const handleClickOpen = () => {
    setOpen(true);
  };

  //conformation box Close
  const handleClose = () => {
    setOpen(false);
  };

  // Delete Employee Delete Api Call
  const DeleteEmployee = (id) => {
    dispatch(removeEmployee(id));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  // if (status === STATUSES.IDLE) {
  //   return console.log("IDLE MESSAGE");
  // }

  return (
    <div>
      {/* conformation Box */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete{" "}
            <b>
              {employees.firstName} {employees.lastName} ?
            </b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={DeleteEmployee}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveEmployee;
