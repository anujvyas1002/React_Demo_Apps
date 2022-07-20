import axios from "axios";
import EmployeeInterface from "../pages/ManageEmployees/AddEmployee";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const employeeSlice = createSlice({
  name: "manageEmployees",
  initialState: {
    employees: [],
    status: STATUSES.IDLE,
    roles: [],
    skills: [],
  },
  extraReducers: (builder: { addCase: (arg0: any, arg1: (state: any) => void) => { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): void; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(skillsData.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(skillsData.fulfilled, (state, action) => {
        state.skills = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(skillsData.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(rolesData.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(rolesData.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(rolesData.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(addEmployee.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(addEmployee.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeEmployee.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeEmployee.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(removeEmployee.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setEmployees, setStatus, setSkillsData, setRolesData } =
  employeeSlice.actions;

export default employeeSlice.reducer;

// Thunks
//  fetch Api All Employee Data
export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
  const res = await axios.get(`http://localhost:3000/employees`);
  return res.data;
});

// Add Employee Api Call
export const addEmployee = createAsyncThunk("employees/add", async (req: EmployeeInterface) => {
  const res = await axios.post(`http://localhost:3000/employees`, req);
  return res.data;
});

// Edit Employee Api Call
export const updateEmployee = createAsyncThunk(
  "employees/update",
  async (req: EmployeeInterface) => {
    const res = await axios.put(`http://localhost:3000/employees/${req.id}`, req);
    return res.data;
  }
);

// Remove Employee Api Call
export const removeEmployee = createAsyncThunk(
  "employees/remove",
  async (id: EmployeeInterface) => {
    const res = await axios.delete(`http://localhost:3000/employees/${id}`);
    const data = res.data;
    return data;
  }
);

//  Role Api All Role Data
export const rolesData = createAsyncThunk("employees/roles", async () => {
  const res = await axios.get(`http://localhost:3000/rolesData`);
  const data = res.data;
  return data;
});

//  Skill Api All Skill Data
export const skillsData = createAsyncThunk("employees/skills", async () => {
  const res = await axios.get(`http://localhost:3000/skillsData`);
  const data = res.data;
  return data;
});
