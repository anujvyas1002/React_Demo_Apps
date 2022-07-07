import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

import { removeSkills, STATUSES } from "../../store/manageSkillsSlice";

export const RemoveSkill = (props) => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { skills, status } = useSelector((state) => state.manageSkills);


  //conformation box Close
  const handleClose = () => {
    setOpen(false);
  };

  // Delete Employee Delete Api Call
  const DeleteRole = (id) => {
    dispatch(removeSkills(id));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }


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
            Are you sure want to delete <b>{skills.skill} ?</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={DeleteRole}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveSkill;
