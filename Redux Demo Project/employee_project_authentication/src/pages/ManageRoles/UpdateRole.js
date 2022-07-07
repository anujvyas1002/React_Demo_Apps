import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { Button, MenuItem, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import { updateRole } from "../../store/manageRolesSlice";
import { STATUSES } from "../../store/manageRolesSlice";

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

export const UpdateRole = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onTouched",
  });

  // Modal state
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const { rolesData, status } = useSelector((state) => state.manageRoles);

  //data send for object
  let req;

  //from data
  const onSubmit = (data) => {
    req = {
      id: Date.now(),
      role: { role: data.role },
      description: data.description,
    };
    handleClose();
    dispatch(
      updateRole(
        req
        // id
      )
    );
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  //Modal popup Close
  const handleClose = () => setShow(false);

  //Modal popup show && setValue for input filed
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={show}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Update Role
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <label htmlFor="role">Choose Your Roles</label>
                <div className="form-group">
                  <TextField
                    fullWidth
                    id="role"
                    className="form-control"
                    select
                    placeholder="--- Select Your Roles ---"
                    {...register("role", { required: "Role is Required" })}
                  >
                    <MenuItem value="">--- Select Your Role---</MenuItem>
                    {rolesData.map((role) => (
                      <MenuItem key={role.id} value={role.role}>
                        {role.role}
                      </MenuItem>
                    ))}
                  </TextField>

                  {/* <NativeSelect
                    className="form-control"
                    id="role"
                    {...register("role", { required: "Role is Required" })}
                  >
                    <option value="">--- Select Your Role---</option>
                    {rolesData.map((role) => (
                      <option key={role.id}>{role.role}</option>
                    ))}
                  </NativeSelect> */}
                  {errors.role && (
                    <div>
                      <small style={{ color: "red" }}>
                        {" "}
                        {errors.role.message}
                      </small>
                    </div>
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
                    rows={2}
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
                    <Grid
                    container
                    alignItems="flex-start"
                  >
                      <small style={{ color: "red" }}>
                        {errors.description.message}
                      </small>
                  </Grid>
                  )}
                </div>
              </Grid>
            </Grid>

            <hr />
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              spacing={0.5}
            >
              <Grid item>
                <Button
                  variant="contained"
                  className="float-end mt-2"
                  color="primary"
                  disabled={!isDirty || !isValid}
                  type="submit"
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className="me-2 float-end mt-2"
                  variant="outlined"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </BootstrapDialog>

      <EditIcon onClick={handleShow} />
    </div>
  );
};
