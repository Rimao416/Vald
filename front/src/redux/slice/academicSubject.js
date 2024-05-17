import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import { API } from "../../config";
import {
  addWithAuthorization,
  fetchWithAuthorization,
  updateWithAuthorization
} from "../../utils/handleFactory";
API.defaults.withCredentials = true;
export const fetchAcademicSubjects = createAsyncThunk(
  "academicSubjects/fetchAcademicSubjects",
  async () => {
    return fetchWithAuthorization("/api/v1/academic-subjects");
  }
);
export const addAcademicSubjects = createAsyncThunk(
  "academicSubjects/fetchAcademicSubjects",
  async (newSubject) => {
    return addWithAuthorization(
      "/api/v1/academic-subjects",
      newSubject,
      "subjectCreated"
    );
  }
);
export const fetchSingleSubject = createAsyncThunk(
  "academicSubjects/fetchSingleSubject",
  async (id) => {
    return fetchWithAuthorization(`/api/v1/academic-subjects/${id}`);
  }
);

export const updateAcademicSubjects = createAsyncThunk(
  "academicSubjects/updateAcademicSubjects",
  async (newSubject) => {
    return updateWithAuthorization(
      `/api/v1/academic-subjects/${newSubject._id}`,
      newSubject,
      "subjectUpdated"
    );
  }
)

let academicSubject = createSlice({
  name: "academicSubjects",
  initialState: {
    academicSubject: [],
    loading: false,
    error: false,
    status: "idle",
  },
  reducers: {
    initializeSubject(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicSubjects.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.status = "idle";
      })
      .addCase(fetchAcademicSubjects.fulfilled, (state, action) => {
        console.log(action);

        state.loading = false;
        state.error = false;
        state.academicSubject = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(fetchAcademicSubjects.rejected, (state) => {
        state.loading = false;
        state.error = true;
        // state.errorType = action.payload;
        state.status = "rejected";
      })
      .addCase(updateAcademicSubjects.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.status = "idle";
      })
      .addCase(updateAcademicSubjects.fulfilled, (state, action) => {
       console.log(action)
        state.loading = false;
        state.error = false;
        // state.academicSubject=[...state.academicSubject,action.payload.data];
        state.status = "success";
      })
      .addCase(updateAcademicSubjects.rejected, (state) => {
        state.loading = false;
        state.error = true;
        // state.errorType = action.payload;
        state.status = "rejected";
      })
      

  },
});
export const { initializeSubject } = academicSubject.actions;
export default academicSubject.reducer;
