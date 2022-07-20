import axios from "axios";
import RoleType from "../pages/ManageRoles/AddRole";
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
  extraReducers: (builder: {
    addCase: (arg0: any, arg1: (state: { status: string; }) => void) => {
      (): any; new(): any; addCase: {
        (arg0: any, arg1: (state: any, action: any) => void): {
          (): any; new(): any; addCase: {
            (arg0: any, arg1: (state: any) => void): {
              (): any; new(): any; addCase: {
                (arg0: any, arg1: (state: any) => void): {
                  (): any; new(): any; addCase: {
                    (arg0: any, arg1: (state: any
                    ) =>
                      void): {
                        (): any; new(): any; addCase: {
                          (arg0: any, arg1: (state: any) => void
                          ): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): void; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any;
                        };
                      }; new(): any;
                  };
                }; new(): any;
              };
            }; new(): any;
          };
        }; new(): any;
      };
    };
  }) => {
    builder
      .addCase(fetchRole.pending, (state: { status: string; }) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.rolesData = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchRole.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(addRole.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addRole.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(addRole.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updateRole.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateRole.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(updateRole.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeRole.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeRole.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(removeRole.rejected, (state) => {
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
export const addRole = createAsyncThunk("role/add", async (req: RoleType) => {
  const res = await axios.post(`http://localhost:3000/rolesData`, req);
  const data = res.data;
  return data;
});

// Edit Role Api Call
export const updateRole = createAsyncThunk("role/update", async (req: RoleType) => {
  const res = await axios.put(`http://localhost:3000/rolesData/${req.id}`, req);
  const data = res.data;
  return data;
});

// Remove Role Api Call
export const removeRole = createAsyncThunk("role/remove", async (id: RoleType) => {
  const res = await axios.delete(`http://localhost:3000/rolesData/${id}`);
  const data = res.data;
  return data;
});
