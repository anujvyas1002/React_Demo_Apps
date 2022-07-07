import React, { useRef } from "react";

import { loginEmployee } from "../../store/authenticationSlice";

import { Button, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { STATUSES } from "../../store/authenticationSlice";

import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const Login = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const [values, setValues] = React.useState({ password: "" });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

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
    console.log(data);
    req = {
      id: Date.now(),
      email: data.email,
      password: data.password,
    };
    login({
      userName: data.userName,
      password: data.password,
    });
    dispatch(loginEmployee(req));
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
          <Card sx={{ width: "300px" }}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container sx={{ mt: "10px" }}>
                  <Grid item xs={12}>
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
                        <Grid
                        container
                        alignItems="flex-start"
                      >
                          <small style={{ color: "red" }}>
                            {errors.email.message}
                          </small>
                        </Grid>
                      )}
                    </div>
                  </Grid>
                </Grid>

                <Grid container sx={{ mt: "10px" }}>
                  <Grid item xs={12}>
                    <div className="form-group">
                      <OutlinedInput
                        type={values.showPassword ? "text" : "password"}
                        onChange={handleChange("password")}
                        fullWidth
                        label="Password"
                        className="form-control"
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
                        })}
                      />
                      {errors.password && (
                        <Grid
                        container
                        alignItems="flex-start"
                      >
                          <small style={{ color: "red" }}>
                            {errors.password.message}
                          </small>{" "}
                        </Grid>
                      )}
                    </div>
                  </Grid>
                </Grid>
                <Grid container sx={{ mt: "10px" }}>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Login
                    </Button>
                  </Grid>
                </Grid>
                <Grid container sx={{ mt: "40px" }}>
                  <Grid>
                    <RouterLink to="/registration">
                      {"Don't have an account? Sign Up"}
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
