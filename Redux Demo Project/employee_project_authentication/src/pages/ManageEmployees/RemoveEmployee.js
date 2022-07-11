import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { removeEmployee, STATUSES } from "../../store/manageEmployeesSlice";

const RemoveEmployee = (props) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.manageEmployees);

  // Delete Employee Delete Api Call
  const DeleteEmployee = (id) => {
    dispatch(removeEmployee(id));
    props.onSaveRemoveEmployee();
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  //close ConfirmBox
  const onClose = () => {
    props.onClose();
  };

  return (
    <div>
      {/* conformation Box */}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete{" "}
          <b>
            {props.employee.firstName} {props.employee.lastName} ?
          </b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={DeleteEmployee(props.employee.id)}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </div>
  );
};

export default RemoveEmployee;
