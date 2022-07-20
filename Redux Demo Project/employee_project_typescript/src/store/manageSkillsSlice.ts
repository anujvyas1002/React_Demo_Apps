import axios from "axios";
import SkillType from "../pages/ManageSkills/AddSkill";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const skillsSlice = createSlice({
  name: "manageSkills",
  initialState: {
    status: STATUSES.IDLE,
    skillsData: [],
  },
  reducers: {
    // setProducts(state, action) {
    //     state.data = action.payload;
    // },
    // setStatus(state, action) {
    //     state.status = action.payload;
    // },
  },
  extraReducers: (builder: { addCase: (arg0: any, arg1: (state: any) => void) => { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any) => void): void; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skillsData = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchSkills.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addSkills.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addSkills.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(addSkills.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updateSkills.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateSkills.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(updateSkills.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeSkills.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeSkills.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(removeSkills.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setSkills, setStatus } = skillsSlice.actions;

export default skillsSlice.reducer;

// Thunks
//  fetch Api All Skills Data
export const fetchSkills = createAsyncThunk("skills/fetch", async () => {
  const res = await axios.get(`http://localhost:3000/skillsData`);
  const data = res.data;
  return data;
});

// Add Skill Api Call
export const addSkills = createAsyncThunk("skills/add", async (req: SkillType) => {
  const res = await axios.post(`http://localhost:3000/skillsData`, req);
  const data = res.data;
  return data;
});

// Edit Skill Api Call
export const updateSkills = createAsyncThunk(
  "skills/update",
  async (req: SkillType) => {
    const res = await axios.put(`http://localhost:3000/skillsData/${req.id}`, req);
    const data = res.data;
    return data;
  }
);

// Remove Skill Api Call
export const removeSkills = createAsyncThunk("skills/remove", async (id: SkillType) => {
  const res = await axios.delete(`http://localhost:3000/skillsData/${id}`);
  const data = res.data;
  return data;
});
