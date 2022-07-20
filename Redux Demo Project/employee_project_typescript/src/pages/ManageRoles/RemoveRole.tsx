import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { removeRole, STATUSES } from "../../store/manageRolesSlice";

type removeRoleProps = {
  role: any;
  onClose: () => void;
  onRemoveRole: () => void;
};

export const RemoveRole = (props: removeRoleProps): ReactElement => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: any) => state.manageRoles);

  // Delete Employee Delete Api Call
  const deleteRole = (id: number) => {
    dispatch(removeRole(id));
    props.onRemoveRole();
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
          onClick={() => deleteRole(props.role.id)}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </div>
  );
};

export default RemoveRole;
