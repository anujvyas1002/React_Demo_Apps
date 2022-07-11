import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { removeSkills, STATUSES } from "../../store/manageSkillsSlice";

export const RemoveSkill = (props) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.manageSkills);

  // Close confirmBox
  const onClose = () => {
    props.onClose();
  };
  
  // Delete Employee Delete Api Call
  const deleteSkill = (id) => {
    dispatch(removeSkills(id));
    props.onSaveRemoveSkill();
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
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete <b>{props.skill.skill} ?</b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={()=>deleteSkill(props.skill.id)}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </div>
  );
};

export default RemoveSkill;
