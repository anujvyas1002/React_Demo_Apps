import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { removeRole, STATUSES } from "../../store/manageRolesSlice";

export const RemoveRole = (props) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.manageRoles);

  // Delete Employee Delete Api Call
  const DeleteRole = (id) => {
    dispatch(removeRole(id));
    props.onSaveRemoveRole();
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  // Close ConfirmBox
  const onClose = () => {
    props.onClose();
  };

  return (
    <div>
      {/* conformation Box */}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete <b>{props.role.role} ?</b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={DeleteRole(props.role.id)}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </div>
  );
};

export default RemoveRole;
