import {  Put } from 'react-axios';
import axios from "axios";

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
        roles: [],
        skills: [],
    },
    reducers: {
        // setProducts(state, action) {
        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     state.status = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(skillsData.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(skillsData.fulfilled, (state, action) => {
                console.log(action.payload)
                state.skills = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(skillsData.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(rolesData.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(rolesData.fulfilled, (state, action) => {
                state.roles = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(rolesData.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            
            .addCase(addEmployee.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(updateEmployee.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
    
});


export const { setEmployees, setStatus, setAddEmployee, setUpdateEmployee,setSkillsData,setRolesData } = employeeSlice.actions;

export default employeeSlice.reducer;




// Thunks
export const fetchEmployees = createAsyncThunk('employees/fetch', async () => {
    const res = await fetch('http://localhost:3000/employees');
    const data = res.json();
    return data;
});
// export const fetchEmployees = createAsyncThunk('employees/fetch', async () => {
//     axios.get(`http://localhost:3000/employees`).then((response) => {
//         const data = response.data
//         return data;
//       });
// });






export const addEmployee = createAsyncThunk('employees/add', async (req) => {
    console.log(req)
    axios.post("http://localhost:3000/employees", req).then((response) => {
        console.log(response)
        return response.data;
      });
    
});




 //skill data get Api call
 export const skillsData = createAsyncThunk('employees/skills', async () => {
    axios.get(`http://localhost:3000/skills`).then((response) => {
        console.log(response.data);
        return response.data;
    });
  })
  

  //Role data get Api call
  export const rolesData = createAsyncThunk('employees/roles', async () => {
    axios.get(`http://localhost:3000/roles`).then((response) => {
        console.log(response);
        const roles = response.data;
      return roles;
    });
  })



// export const skillsData = createAsyncThunk('employees/skills', async () => {
//     const res = await fetch('http://localhost:3000/skills');
//     const data = await res.json();
//     return data;
// });

// export const rolesData = createAsyncThunk('employees/roles', async () => {
//     const res = await fetch('http://localhost:3000/roles');
//     const data = await res.json();
//     return data;
// });
  


// export const addEmployee = createAsyncThunk('employees/add', async (req) => {
//     console.log(req)
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ req })
//     };
//     const response = await fetch('http://localhost:3000/employees', requestOptions);
//     const data = await response.json();
//     fetchEmployees();
//     return data;
    
// });










export const updateEmployee = createAsyncThunk('employees/update', async (id,req) => {
    const res = await Put(`http://localhost:3000/employees/${id}`, req);
    const data = await res.json();
    console.log(data)
    return data;
});




  

// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await fetch('http://localhost:3000/employees');
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     };
// }
