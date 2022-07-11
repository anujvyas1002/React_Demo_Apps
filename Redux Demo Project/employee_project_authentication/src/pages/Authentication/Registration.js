import React, { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import {
  registrationEmployee,
  STATUSES,
} from "../../store/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // password value show & hide
  const [values, setValues] = useState({ password: "" });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // click icon password value show
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  // click icon password value Hide
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const password = useRef({});
  password.current = watch("password", "");

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.authentication);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  let req;
  //from data
  const onSubmit = (data) => {
    req = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      ContactNumber: data.ContactNumber,
      role: data.role,
      password: data.password,
    };
    dispatch(registrationEmployee(req));
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ display: "inline-flex", mt: "40px" }}>
          <Card sx={{ width: "550px" }}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container sx={{ mt: "10px" }} spacing={2}>
                  <Grid item xs={6}>
                    <div className="form-group">
                      <TextField
                        type="text"
                        fullWidth
                        label="First Name"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter Your First  Name"
                        {...register("firstName", {
                          required: "First Name is Required",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Frist name is invaild",
                          },
                          minLength: {
                            value: 3,
                            message: "Enter your Minimum 3 characters",
                          },
                          maxLength: {
                            value: 20,
                            message: "Enter your Maximum 20 characters",
                          },
                        })}
                      />
                      {errors.firstName && (
                        <Grid container alignItems="flex-start">
                          <small style={{ color: "red" }}>
                            {errors.firstName.message}
                          </small>
                        </Grid>
                      )}
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div className="form-group">
                      <TextField
                        type="text"
                        fullWidth
                        label="Last Name"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter Your Last Name"
                        {...register("lastName", {
                          required: "Last Name is Required",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Last name is invaild",
                          },
                          minLength: {
                            value: 3,
                            message: "Enter your Minimum 3 characters",
                          },
                          maxLength: {
                            value: 20,
                            message: "Enter your Maximum 20 characters",
                          },
                        })}
                      />
                      {errors.lastName && (
                        <Grid container alignItems="flex-start">
                          <small style={{ color: "red" }}>
                            {errors.lastName.message}
                          </small>{" "}
                        </Grid>
                      )}
                    </div>
                  </Grid>
                </Grid>

                <Grid container sx={{ mt: "0.5px" }} spacing={2}>
                  <Grid item xs={6}>
                    <div className="form-group">
                      <TextField
                        type="text"
                        fullWidth
                        label="Email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Your Email"
                        {...register("email", {
                          required: "Email is Required",
                          pattern: {
                            value:
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,

                            message: "Email is invaild",
                          },
                        })}
                      />
                      {errors.email && (
                        <Grid container alignItems="flex-start">
                          <small style={{ color: "red" }}>
                            {errors.email.message}
                          </small>
                        </Grid>
                      )}
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div className="form-group">
                      <TextField
                        type="number"
                        fullWidth
                        label="Contact Number"
                        className="form-control"
                        id="contactNumber"
                        placeholder="Enter Your Contact Number"
                        {...register("contactNumber", {
                          required: "Contact Number is Required",
                          minLength: {
                            value: 10,
                            message: "Enter your Minimum 10 digit",
                          },
                          maxLength: {
                            value: 12,
                            message: "Enter your Maximum 12 digit",
                          },
                        })}
                      />
                      {errors.contactNumber && (
                        <Grid container alignItems="flex-start">
                          <small style={{ color: "red" }}>
                            {errors.contactNumber.message}
                          </small>
                        </Grid>
                      )}
                    </div>
                  </Grid>
                </Grid>

                <Grid container sx={{ mt: "0.5px" }} spacing={2}>
                  <Grid item xs={6}>
                    <div className="form-group">
                      <OutlinedInput
                        className="form-control"
                        type={values.showPassword ? "text" : "password"}
                        onChange={handleChange("password")}
                        fullWidth
                        label="Password"
                        id="password"
                        placeholder="Enter Your Password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        {...register("password", {
                          required: "password is Required",
                          pattern: {
                            value:
                              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                            message: "password is invaild",
                          },
                          minLength: {
                            value: 6,
                            message: "Enter your Minimum 6 characters",
                          },
                          maxLength: {
                            value: 16,
                            message: "Enter your Maximum 16 characters",
                          },
                        })}
                      />
                      {errors.password && (
                        <Grid container alignItems="flex-start">
                          <small style={{ color: "red" }}>
                            {errors.password.message}
                          </small>{" "}
                        </Grid>
                      )}
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div className="form-group">
                      <TextField
                        type="password"
                        fullWidth
                        label="Confirm Password"
                        className="form-control"
                        id="confirmpassword"
                        placeholder="Enter Your confirm password"
                        {...register("confirmpassword", {
                          validate: (value) =>
                            value === password.current ||
                            "The passwords do not match",
                        })}
                      />

                      {errors.confirmpassword && (
                        <Grid container alignItems="flex-start">
                          <small style={{ color: "red" }}>
                            {errors.confirmpassword.message}
                          </small>{" "}
                        </Grid>
                      )}
                    </div>
                  </Grid>
                </Grid>

                <Grid container sx={{ mt: "10px" }}>
                  <Grid item xs={12}>
                    <div className="form-group">
                      <TextField
                        fullWidth
                        id="outlined-select-currency"
                        select
                        className="form-control"
                        label="-- Select Your Role---"
                        {...register("role", { required: "Role is Required" })}
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                      </TextField>

                      {errors.role && (
                        <Grid container alignItems="flex-start">
                          <small style={{ color: "red" }}>
                            {" "}
                            {errors.role.message}
                          </small>
                        </Grid>
                      )}
                    </div>
                  </Grid>
                </Grid>

                <Grid container sx={{ mt: "40px" }}>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>

                <Grid container sx={{ mt: "40px" }}>
                  <Grid>
                    <RouterLink to="/login">
                      {"Already have an account? click me"}
                    </RouterLink>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </div>
  );
};
