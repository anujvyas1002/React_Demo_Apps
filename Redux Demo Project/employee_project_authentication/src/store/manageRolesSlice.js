import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const rolesSlice = createSlice({
  name: "manageRoles",
  initialState: {
    status: STATUSES.IDLE,
    rolesData: [],
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
      .addCase(fetchRole.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.rolesData = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchRole.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(addRole.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(addRole.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updateRole.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeRole.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeRole.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(removeRole.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setRoles, setStatus } = rolesSlice.actions;

export default rolesSlice.reducer;

// Thunks
//  fetch Api All Role Data
export const fetchRole = createAsyncThunk("role/fetch", async () => {
  const res = await axios.get(`http://localhost:3000/rolesData`);
  const data = res.data;
  return data;
});

// Add Role Api Call
export const addRole = createAsyncThunk("role/add", async (req) => {
  const res = await axios.post(`http://localhost:3000/rolesData`, req);
  const data = res.data;
  return data;
});

// Edit Role Api Call
export const updateRole = createAsyncThunk("role/update", async (id, req) => {
  const res = await axios.put(`http://localhost:3000/rolesData/${id}`, req);
  const data = res.data;
  return data;
});

// Remove Role Api Call
export const removeRole = createAsyncThunk("role/remove", async (id) => {
  const res = await axios.delete(`http://localhost:3000/rolesData/${id}`);
  const data = res.data;
  return data;
});
