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
  extraReducers: (builder: {
    addCase: (arg0: any, arg1: (state: any) => void) => {
      (): any; new(): any; addCase: {
        (arg0: any, arg1: (state: any, action: any) => void): {
          (): any; new(): any; addCase: {
            (arg0: any, arg1: (state: any) => void): {
              (): any; new(): any; addCase: {
                (arg0: any, arg1: (state: any) => void): {
                  (): any; new(): any; addCase: {
                    (arg0: any, arg1: (state: any, action:
                      // setProducts(state, action) {
                      //     state.data = action.payload;
                      // },
                      // setStatus(state, action) {
                      //     state.status = action.payload;
                      // },
                      any // setProducts(state, action) {
                      //     state.data = action.payload;
                      // },
                      // setStatus(state, action) {
                      //     state.status = action.payload;
                      // },
                    ) => void): {
                      (): any; new(): any; addCase: {
                        (arg0: any, arg1: (state:
                          // },
                          // setStatus(state, action) {
                          //     state.status = action.payload;
                          // },
                          any // },
                          // setStatus(state, action) {
                          //     state.status = action.payload;
                          // },
                        ) => void // setStatus(state, action) {
                        ): void; new(): any;
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
      .addCase(loginEmployee.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(loginEmployee.fulfilled, (state, action) => {
        state.login = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(loginEmployee.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(registrationEmployee.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(registrationEmployee.fulfilled, (state, action) => {
        state.registration = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(registrationEmployee.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setAuthentication, setStatus } = authenticationSlice.actions;

export default authenticationSlice.reducer;

export const registrationEmployee = createAsyncThunk(
  "Authentication/registration",
  async (req: any) => {
    axios.post("http://localhost:3000/users", req).then((response) => {
      return response.data;
    });
  }
);

export const loginEmployee = createAsyncThunk(
  "Authentication/add",
  async (req: any) => {
    axios.post("http://localhost:3000/login", req).then((response) => {
      return response.data;
    });
  }
);
