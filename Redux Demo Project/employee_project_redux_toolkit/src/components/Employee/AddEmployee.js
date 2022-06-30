
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Button, NativeSelect, Stack, TextField ,Grid }from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../store/employeeSlice";
import { STATUSES } from "../../store/employeeSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width:450,
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
            position: 'absolute',
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

export const AddEmployee =() => {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onTouched"
  });


  //skills get state
  const [skills, setSkills] = useState([]);

  // roles get state
  const [roles, setRoles] = useState([]);

  // selected Skill mantain state
  const [selectedSkills, setSelectedSkills] = useState([]);

  // SelectedDate mantain
  const [selectedDate, setSelectedDate] = useState();

  const dispatch = useDispatch();
  const {  status } = useSelector((state) => state.employee);


  

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
}

if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
}


  
// date format
  function formatDate(timestamp){
    var x= new Date(timestamp);
    var DD = x.getDate();
    var MM = x.getMonth()+1;
    var YYYY = x.getFullYear();
    return YYYY +"/" + MM+"/" + DD;
   
 }
 
 //data send for object
  let req;

  //from data
  const onSubmit = (data) => {
    console.log(data)
    req = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      dob: formatDate(selectedDate),
      employee_about: data.employee_about,
      gender: data.gender,
      role: { role: data.role },
      skills: selectedSkills
    };
    handleClose();
    dispatch(addEmployee(req));
  };

  

 //skill data get Api call
  function skillsData() {
    axios.get(`http://localhost:3000/skills`).then((response) => {
      setSkills(response.data);
    });
  }

  //Role data get Api call
  function rolesData() {
    axios.get(`http://localhost:3000/roles`).then((response) => {
      setRoles(response.data);
    });
  }

 //Modal popup close
  const handleClose = () => setShow(false);

  //Modal popup show
  const handleShow = () => {
    setShow(true);
    skillsData();
    rolesData();
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
      <Button
      sx={{ mt: "20px"}}
        variant="contained"
        color="primary"
        onClick={handleShow}
      >
        Add Employee
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={show}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Create New Empoyee
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} >
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
                    message: "Frist name is invaild"
                  },
                  minLength: {
                    value: 3,
                    message: "Enter your Minimum 3 characters"
                  },
                  maxLength: {
                    value: 20,
                    message: "Enter your Maximum 20 characters"
                  }
                })}
              />
              {errors.firstName && (
                <div><small>{errors.firstName.message}</small></div>
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
                    message: "Last name is invaild"
                  },
                  minLength: {
                    value: 3,
                    message: "Enter your Minimum 3 characters"
                  },
                  maxLength: {
                    value: 20,
                    message: "Enter your Maximum 20 characters"
                  }
                })}
              />
              {errors.lastName && (
                <div><small>{errors.lastName.message}</small> </div>
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
                <div><small> {errors.dob.message}</small></div>
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
                rows={2}
                maxRows={4}
                placeholder="Enter Your employee"
                {...register("employee_about", {
                  required: "Employee About is Required",
                  minLength: {
                    value: 3,
                    message: "Enter your Minimum 3 characters"
                  },
                  maxLength: {
                    value: 300,
                    message: "Enter your Maximum 300 characters"
                  }
                })}
              />
              {errors.employee_about && (
                <div className="text-danger">
                  <small>
                  {errors.employee_about.message}
                  </small>
                </div>
              )}
            </div>
        </Grid>
        <Grid item xs={6}>
        <label htmlFor="role">Choose Your Roles</label>
            <div className="form-group">
              <NativeSelect
                className="form-control"
                id="role"
                {...register("role", { required: "Role is Required" })}
              >
                <option value="">--- Select Your Roles ---</option>
                {roles.map((role) => (
                  <option key={role.id}>{role.role}</option>
                ))}
              </NativeSelect>
              {errors.role && (
                <div ><small> {errors.role.message}</small></div>
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
                  {...register("gender", { required: "Gender is Required" })}
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
                  name="gender"
                  {...register("gender", { required: "Gender is Required" })}
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
                  {...register("gender", { required: "Gender is Required" })}
                />
                <label className="form-check-label" htmlFor="other">
                  Other
                </label>
              </div>

              {errors.gender && (
                <div > <small>{errors.gender.message}</small></div>
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
          <label htmlFor="skills">Skills</label>
            <div className="form-control">
              {skills.map((skill) => (
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
                  <div >
                    <small>
                      Enter your Minimum 1 Skills
                      </small>
                  </div>
                )}
            </div>
          </Grid>
        </Grid>

            <hr></hr>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Create
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
            >
              Close
            </Button>
          </form>

        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

























// import React, { useState } from "react";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { Button, Input, NativeSelect, Stack, TextField } from "@mui/material";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

// import { useDispatch, useSelector } from "react-redux";
// import { addEmployee } from "../../store/employeeSlice";
// import { STATUSES } from "../../store/employeeSlice";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };


// export const AddEmployee = (props) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     mode: "onTouched"
//   });

//   // Modal state
//   const [show, setShow] = useState(false);

//   //skills get state
//   const [skills, setSkills] = useState([]);

//   // roles get state
//   const [roles, setRoles] = useState([]);

//   // selected Skill mantain state
//   const [selectedSkills, setSelectedSkills] = useState([]);

//   // SelectedDate mantain
//   const [selectedDate, setSelectedDate] = useState();

//   const dispatch = useDispatch();
//   const {  status } = useSelector((state) => state.employee);


  

//   if (status === STATUSES.LOADING) {
//     return <h2>Loading....</h2>;
// }

// if (status === STATUSES.ERROR) {
//     return <h2>Something went wrong!</h2>;
// }


  
// // date format
//   function formatDate(timestamp){
//     var x= new Date(timestamp);
//     var DD = x.getDate();
//     var MM = x.getMonth()+1;
//     var YYYY = x.getFullYear();
//     return YYYY +"/" + MM+"/" + DD;
   
//  }
 
//  //data send for object
//   let req;

//   //from data
//   const onSubmit = (data) => {
//     console.log(data)
//     req = {
//       id: Date.now(),
//       firstName: data.firstName,
//       lastName: data.lastName,
//       dob: formatDate(selectedDate),
//       employee_about: data.employee_about,
//       gender: data.gender,
//       role: { role: data.role },
//       skills: selectedSkills
//     };
//     handleClose();
//     dispatch(addEmployee(req));
//   };

  

//  //skill data get Api call
//   function skillsData() {
//     axios.get(`http://localhost:3000/skills`).then((response) => {
//       setSkills(response.data);
//     });
//   }

//   //Role data get Api call
//   function rolesData() {
//     axios.get(`http://localhost:3000/roles`).then((response) => {
//       setRoles(response.data);
//     });
//   }

//  //Modal popup close
//   const handleClose = () => setShow(false);

//   //Modal popup show
//   const handleShow = () => {
//     setShow(true);
//     skillsData();
//     rolesData();
//   };

//   // Skillls Input filed condition
//   function skillCheck(e, skill) {
//     let newSkills = [...selectedSkills];
//     var index = selectedSkills.findIndex((o) => o.id === skill.id);
//     if (index === -1) {
//       newSkills.push(skill);
//     } else {
//       newSkills.splice(index, 1);
//     }
//     setSelectedSkills(newSkills);
//   }

//   return (
    // <div>
    //   <Button
    //   sx={{ mt: "20px"}}
    //     variant="contained"
    //     color="primary"
    //     onClick={handleShow}
    //   >
    //     Add Employee
    //   </Button>


//       <Modal
//         open={show}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//           Create New Empoyee
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="form-group">
//                <TextField 
//                 type="text"
//                 className="form-control"
//                 label="First  Name"
//                 id="firstName"
//                 variant="outlined" 
//                 placeholder="Enter Your First  Name"
//                 {...register("firstName", {
//                   required: "First Name is Required",
//                   pattern: {
//                     value: /^[A-Za-z]+$/i,
//                     message: "Frist name is invaild"
//                   },
//                   minLength: {
//                     value: 3,
//                     message: "Enter your Minimum 3 characters"
//                   },
//                   maxLength: {
//                     value: 20,
//                     message: "Enter your Maximum 20 characters"
//                   }
//                 })}
//               />
//               {errors.firstName && (
//                 <div className="text-danger"> {errors.firstName.message}</div>
//               )}
//             </div>
//             <div className="form-group">
//               <TextField 
//               className="form-control" 
//               type="text"
//               label="Last Name"
//               variant="outlined" 
//               id="lastName"
//               {...register("lastName", {
//                 required: "Last Name is Required",
//                 pattern: {
//                   value: /^[A-Za-z]+$/i,
//                   message: "Last name is invaild"
//                 },
//                 minLength: {
//                   value: 3,
//                   message: "Enter your Minimum 3 characters"
//                 },
//                 maxLength: {
//                   value: 20,
//                   message: "Enter your Maximum 20 characters"
//                 }
//               })}
              
//               />
             
//               {errors.lastName && (
//                 <div className="text-error"> {errors.lastName.message}</div>
//               )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="gender">Choose Your Gender</label>
//               <div className="form-check form-check-inline">
//                 <Input
//                   className="form-check-input"
//                   type="radio"
//                   id="male"
//                   value="Male"
//                   {...register("gender", { required: "Gender is Required" })}
//                 />
//                 <label className="form-check-label" htmlFor="male">
//                   Male
//                 </label>
//               </div>
//               <div className="form-check form-check-inline">
//                 <Input
//                   className="form-check-input"
//                   type="radio"
//                   id="female"
//                   value="Female"
//                   name="gender"
//                   {...register("gender", { required: "Gender is Required" })}
//                 />
//                 <label className="form-check-label" htmlFor="female">
//                   Female
//                 </label>
//               </div>
//               <div className="form-check form-check-inline">
//                 <Input
//                   className="form-check-input"
//                   type="radio"
//                   id="other"
//                   value="Other"
//                   {...register("gender", { required: "Gender is Required" })}
//                 />
//                 <label className="form-check-label" htmlFor="other">
//                   Other
//                 </label>
//               </div>

//               {errors.gender && (
//                 <div className="text-danger"> {errors.gender.message}</div>
//               )}
//             </div>
          
//              <div className="form-group">
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <label htmlFor="dob">Date of Birth</label>
//                 <Stack spacing={3}>
//                   <DesktopDatePicker
//                     // label="For desktop"
//                     variant="outlined" 
//                     inputFormat="dd/MM/yyyy"
//                     className="form-control"
//                     value={selectedDate}
//                     {...register("dob", { required: "DOB is Required" })}
//                     onChange={(newValue) => {
//                       setSelectedDate(newValue);
//                     }}
//                     maxDate={new Date()}
//                     renderInput={(params) => <TextField {...params} />}
//                   />
//                 </Stack>
//               </LocalizationProvider>

//               {errors.dob && (
//                 <span className="text-danger"> {errors.dob.message}</span>
//               )}
//             </div> 

//             <div className="form-group">
//               <label htmlFor="role">Choose Your Roles</label>
//               <NativeSelect
//                 className="form-control"
//                 variant="outlined" 
//                 id="role"
//                 {...register("role", { required: "Role is Required" })}
//               >
//                 <option value="">--- Select Your Roles ---</option>
//                 {roles.map((role) => (
//                   <option key={role.id}>{role.role}</option>
//                 ))}
//               </NativeSelect>
//               {errors.role && (
//                 <div className="text-danger"> {errors.role.message}</div>
//               )}
//             </div>

//             <div className="form-group">
//                 <textarea
//                 type="textarea"
//                 className="form-control"
//                 id="employee_about"
//                 placeholder="Enter Your employee"
//                 {...register("employee_about", {
//                   required: "Employee About is Required",
//                   minLength: {
//                     value: 3,
//                     message: "Enter your Minimum 3 characters"
//                   },
//                   maxLength: {
//                     value: 300,
//                     message: "Enter your Maximum 300 characters"
//                   }
//                 })}
//               />
//               {errors.employee_about && (
//                 <div className="text-danger">
//                   {errors.employee_about.message}
//                 </div>
//               )}
//             </div>

//             <label htmlFor="skills">Skills</label>
//             <div className="form-control">
//               {skills.map((skill) => (
//                 <div className="form-check" key={skill.id}>
//                   <Input
//                     type="Checkbox"
//                     {...register("skills", { required: true })}
//                     id={skill.id}
//                     name="skills"
//                     value={skill}
//                     onChange={(e) => skillCheck(e, skill)}
//                   />
//                   <label className="form-check-label" htmlFor={skill.id}>
//                     {skill.skill}
//                   </label>
//                 </div>
//               ))}

//               {selectedSkills.length < 1 &&
//                 errors.skills?.type === "required" && (
//                   <div className="text-danger">Enter your Minimum 1 Skills</div>
//                 )}
//             </div>

//             <hr></hr>
//             <Button
//               variant="contained"
//               className="float-end mt-2"
//               color="primary"
//               type="submit"
//             >
//               Create
//             </Button>
//             <Button
//               className="me-2 float-end mt-2"
//               variant="outlined"
//               onClick={handleClose}
//             >
//               Close
//             </Button>
//           </form>
//           </Typography>
//         </Box>
//       </Modal>

     
//       {/* Loader */}
//       {/* <Loaders /> */}

//     </div>
//   );
// };

