/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { addSkills, fetchSkills } from "../../store/manageSkillsSlice";

import { Button, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { STATUSES } from "../../store/manageSkillsSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 450,
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const AddSkill = () => {
  const [show, setShow] = useState(false);

  const [selectedSkills, setSelectedSkills] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useDispatch();
  const { skillsData, status } = useSelector((state) => state.manageSkills);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  //data send for object
  let req;

  //from data
  const onSubmit = (data) => {
    console.log(data);
    req = {
      id: Date.now(),
      skills: selectedSkills,
      description: data.description,
    };
    handleClose();
    dispatch(addSkills(req));
    fetchSkills();
  };

  //Modal popup close
  const handleClose = () => setShow(false);

  //Modal popup show
  const handleShow = () => {
    setShow(true);
  };

  // Skillls Input filed condition
  function skillCheck(e, skill) {
    let newSkills = [...selectedSkills];
    var index = selectedSkills.findIndex((o) => o.id === skill.id);
    if (index === -1) {
      newSkills.push(skill);
    } else {
      newSkills.splice(index, 1);
    }
    setSelectedSkills(newSkills);
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Button
          sx={{ mt: "10px" }}
          variant="contained"
          color="primary"
          onClick={handleShow}
        >
          Add Skills
        </Button>
      </Grid>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={show}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add New Skills
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <label htmlFor="skills">Skills</label>
                <div className="form-control">
                  {skillsData.map((skill) => (
                    <div className="form-check" key={skill.id}>
                      <input
                        type="Checkbox"
                        {...register("skills", { required: true })}
                        id={skill.id}
                        name="skills"
                        value={skill}
                        onChange={(e) => skillCheck(e, skill)}
                      />
                      <label className="form-check-label" htmlFor={skill.id}>
                        {skill.skill}
                      </label>
                    </div>
                  ))}

                  {selectedSkills.length < 1 &&
                    errors.skills?.type === "required" && (
                      <Grid
                        container
                        alignItems="flex-start"
                      >
                        <small style={{ color: "red" }}>
                          Enter your Minimum 1 Skills
                        </small>
                     </Grid>
                    )}
                </div>
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="description">Description</label>
                <div className="form-group">
                  <TextField
                    type="text"
                    className="form-control"
                    id="description"
                    multiline
                    rows={3}
                    maxRows={4}
                    placeholder="Enter Your Description"
                    {...register("description", {
                      required: "Description is Required",
                      minLength: {
                        value: 3,
                        message: "Enter your Minimum 3 characters",
                      },
                      maxLength: {
                        value: 300,
                        message: "Enter your Maximum 300 characters",
                      },
                    })}
                  />
                  {errors.description && (
                    <div className="text-danger">
                      <small style={{ color: "red" }}>
                        {errors.description.message}
                      </small>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>

            <hr/>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              spacing={0.5}
            >
            <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
            </Grid>
            <Grid item>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
            </Grid>
            </Grid>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};
