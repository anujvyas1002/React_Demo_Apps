import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    registration: [],
    login: [],
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
      .addCase(loginEmployee.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(loginEmployee.fulfilled, (state, action) => {
        state.login = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(loginEmployee.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(registrationEmployee.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(registrationEmployee.fulfilled, (state, action) => {
        state.registration = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(registrationEmployee.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setAuthentication, setStatus } = authenticationSlice.actions;

export default authenticationSlice.reducer;

export const registrationEmployee = createAsyncThunk(
  "Authentication/registration",
  async (req) => {
    console.log(req);
    axios.post("http://localhost:3000/users", req).then((response) => {
      console.log(response);
      return response.data;
    });
  }
);

export const loginEmployee = createAsyncThunk(
  "Authentication/add",
  async (req) => {
    console.log(req);
    axios.post("http://localhost:3000/login", req).then((response) => {
      console.log(response);
      return response.data;
    });
  }
);
