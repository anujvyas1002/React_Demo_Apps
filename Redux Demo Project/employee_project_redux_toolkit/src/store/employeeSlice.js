import { Post } from 'react-axios';

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


export const { setEmployees, setStatus, setAddEmployee, setUpdateEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;

// Thunks
export const fetchEmployees = createAsyncThunk('employees/fetch', async () => {
    const res = await fetch('http://localhost:3000/employees');
    const data = await res.json();
    return data;
});

export const addEmployee = createAsyncThunk('employees/add', async (req) => {
    const res = await Post('http://localhost:3000/employees',req);
    const data = await res.json();
    console.log(data)
    return data;
});

export const updateEmployee = createAsyncThunk('employees/update', async (id,req) => {
    const res = await Post(`http://localhost:3000/employees/${id}`, req);
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
