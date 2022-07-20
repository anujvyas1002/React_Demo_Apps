import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { removeEmployee, STATUSES } from "../../store/manageEmployeesSlice";

type removeEmployeeProps = {
  employee: any;
  onClose: () => void;
  onRemoveEmployee: () => void;
};


const RemoveEmployee = (props: removeEmployeeProps): ReactElement => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: any) => state.manageEmployees);

  // Delete Employee Delete Api Call
  const deleteEmployee = (id: number) => {
    dispatch(removeEmployee(id));
    props.onRemoveEmployee();
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
          onClick={() => deleteEmployee(props.employee.id)}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </div>
  );
};

export default RemoveEmployee;
