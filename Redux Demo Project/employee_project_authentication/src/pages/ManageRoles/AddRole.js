import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  TextField,
  Grid,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addRole, STATUSES } from "../../store/manageRolesSlice";

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

export const AddRole = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.manageRoles);

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
    req = {
      id: Date.now(),
      role: data.role,
      description: data.description,
    };
    dispatch(addRole(req));
    props.onSaveUpdateTable();
  };

  // close Dialog
  const onClose = () => {
    props.onClose();
  };

  return (
    <div>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Add New Role
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <label htmlFor="role">Role</label>
              <div className="form-group">
                <TextField
                  type="text"
                  className="form-control"
                  id="role"
                  placeholder="Enter Your Role"
                  {...register("role", {
                    required: "Role is Required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Role is invaild",
                    },
                    minLength: {
                      value: 1,
                      message: "Enter your Minimum 2 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Enter your Maximum 20 characters",
                    },
                  })}
                />
                {errors.role && (
                  <Grid container alignItems="flex-start">
                    <small style={{ color: "red" }}>
                      {errors.role.message}
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
                  rows={1}
                  maxRows={4}
                  placeholder="Enter Your Description"
                  {...register("description", {
                    required: false,
                  })}
                />
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
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={onClose}>
                Close
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </div>
  );
};
