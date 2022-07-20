import React, { useState, ReactElement } from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  NativeSelect,
  Stack,
  TextField,
  Grid,
  IconButton,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { useDispatch, useSelector } from "react-redux";
import { updateEmployee, STATUSES } from "../../store/manageEmployeesSlice";

import EmployeeInterface from "./AddEmployee";

const BootstrapDialogTitle = (props: any) => {
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

type UpdateEmployeeProps = {
  employee: any;
  onClose: () => void;
  onEditUpdateTable: () => void;
};

export const UpdateEmployee = (props: UpdateEmployeeProps): ReactElement => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<EmployeeInterface>({
    mode: "onTouched",
  });

  // selected Skill mantain state
  const [selectedSkills, setSelectedSkills] = useState(props.employee.skills);

  // SelectedDate mantain
  const [selectedDate, setSelectedDate] = useState(props.employee.dob);

  const dispatch = useDispatch();
  const { skills, roles, status } = useSelector(
    (state: any) => state.manageEmployees
  );

  // date format
  function formatDate(timestamp: string | number | Date) {
    let x = new Date(timestamp);
    let DD = x.getDate();
    let MM = x.getMonth() + 1;
    let YYYY = x.getFullYear();
    return YYYY + "/" + MM + "/" + DD;
  }

  //data send for object
  let req;

  //from data
  const onSubmit = (data: EmployeeInterface) => {
    req = {
      id: props.employee.id,
      firstName: data.firstName,
      lastName: data.lastName,
      dob: formatDate(selectedDate),
      employee_about: data.employee_about,
      gender: data.gender,
      role: { role: data.role },
      skills: selectedSkills,
    };
    dispatch(updateEmployee(req));
    props.onEditUpdateTable();
  };

  // SetValue for input filed
  setValue("id", props.employee.id);
  setValue("firstName", props.employee.firstName);
  setValue("lastName", props.employee.lastName);
  setValue("dob", props.employee.dob);
  setValue("role", props.employee.role.role);
  setValue("gender", props.employee.gender);
  setValue("employee_about", props.employee.employee_about);
  setValue("skills", props.employee.skills);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  // close Dialog
  const onClose = () => {
    props.onClose();
  };

  // Skills input filed Condition
  function skillCheck(skill: { id: any; }) {
    let newSkills = [...selectedSkills];
    let index = selectedSkills.findIndex((o: any) => o.id === skill.id);
    if (index === -1) {
      newSkills.push(skill);
    } else {
      newSkills.splice(index, 1);
    }
    setSelectedSkills(newSkills);
  }

  return (
    <div>
      <BootstrapDialogTitle onClose={onClose}>
        {props.employee.firstName} {props.employee.lastName} Update
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <label htmlFor="firstName">First Name</label>
              <div className="form-group">
                <TextField
                  type="text"
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
              <label htmlFor="lastName">Last Name</label>
              <div className="form-group">
                <TextField
                  type="text"
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

          <div className="form-group">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <label htmlFor="dob">Date of Birth</label>
              <Stack spacing={3}>
                <DesktopDatePicker
                  // label="For desktop"
                  inputFormat="dd/MM/yyyy"
                  className="form-control"
                  value={selectedDate}
                  {...register("dob", { required: "DOB is Required" })}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  maxDate={new Date()}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>

            {errors.dob && (
              <Grid container alignItems="flex-start">
                <small style={{ color: "red" }}> {errors.dob.message}</small>
              </Grid>
            )}
          </div>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <label htmlFor="employee_about">Employee About</label>
              <div className="form-group">
                <TextField
                  type="text"
                  className="form-control"
                  id="employee_about"
                  multiline
                  rows={1}
                  maxRows={4}
                  placeholder="Enter Your employee"
                  {...register("employee_about", {
                    required: "Employee About is Required",
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
                {errors.employee_about && (
                  <Grid container alignItems="flex-start">
                    <small style={{ color: "red" }}>
                      {errors.employee_about.message}
                    </small>
                  </Grid>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="role">Choose Your Roles</label>
              <div className="form-group">
                <NativeSelect
                  className="form-control"
                  fullWidth
                  id="role"
                  {...register("role", { required: "Role is Required" })}
                >
                  {roles.map((role: any) => (
                    <option key={role.id}>{role.role}</option>
                  ))}
                </NativeSelect>
                {/* <TextField
                    fullWidth
                    id="role"
                    className="form-control"
                    select
                    placeholder="--- Select Your Roles ---"
                    {...register("role", { required: "Role is Required" })}
                  >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.role}>
                      {role.role}
                    </MenuItem>
                  ))}
                </TextField> */}
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

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <label htmlFor="gender">Choose Your Gender</label>
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="male"
                    value="Male"
                    {...register("gender", {
                      required: "Gender is Required",
                    })}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="female"
                    value="Female"
                    {...register("gender", {
                      required: "Gender is Required",
                    })}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="other"
                    value="Other"
                    {...register("gender", {
                      required: "Gender is Required",
                    })}
                  />
                  <label className="form-check-label" htmlFor="other">
                    Other
                  </label>
                </div>

                {errors.gender && (
                  <Grid container alignItems="flex-start">
                    {" "}
                    <small style={{ color: "red" }}>
                      {errors.gender.message}
                    </small>
                  </Grid>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="skills">Skills</label>
              <div className="form-control">
                {skills.map((skill: any) => (
                  <div className="form-check" key={skill.id}>
                    <input
                      type="Checkbox"
                      {...register("skills", { required: true })}
                      id={skill.id}
                      name="skills"
                      value="skills"
                      checked={
                        selectedSkills.findIndex((o: any) => o.id === skill.id) !==
                        -1
                      }
                      onChange={() => skillCheck(skill)}
                    />
                    <label className="form-check-label" htmlFor={skill.id}>
                      {skill.skill}
                    </label>
                  </div>
                ))}
                {selectedSkills?.length < 1 &&
                  errors.skills?.type === "required" && (
                    <Grid container alignItems="flex-start">
                      <small style={{ color: "red" }}>
                        Enter your Minimum 1 Skills
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
                onClick={onClose}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </div>
  );
};
