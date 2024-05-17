import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";
import { toast } from "react-toastify";
import { fetchWithAuthorization } from "../../utils/handleFactory";
API.defaults.withCredentials = true;
// export const fetchAcademicTerms = createAsyncThunk(

// )
export const fetchAcademicStudents = createAsyncThunk(
  "academicTerms/fetchAcademicStudents",
  async () => {
    return fetchWithAuthorization("/api/v1/admin/students");
  }
);

export const addAcademicStudent = createAsyncThunk(
  "academicTerms/addAcademicStudent",
  async (newAcademicStudent) => {
    console.log(newAcademicStudent);
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await API.post(
        "/api/v1/admin/students/register",
        newAcademicStudent
      );
      console.log(response.data);
      toast.success(response.data.message);
      return response.data.academicTermCreated;
    } catch (error) {
      console.log(error.response.data);
      toast.error(
        error.response.data.message ||
          "Une erreur est survenue lors de la connexion."
      );
      throw error.response.data;
    }
  }
);
export const getSingleStudent = createAsyncThunk(
  "academicTerms/getSingleStudent",
  async (id) => {
    return fetchWithAuthorization(`/api/v1/admin/students/${id}`);
  }
);
export const updateAcademicStudent = createAsyncThunk(
  "academicTerms/updateAcademicStudent",
  async (newAcademicStudent) => {
    console.log(newAcademicStudent);
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await API.put(
        `/api/v1/admin/students/${newAcademicStudent._id}`,
        newAcademicStudent
      );
      console.log(response.data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(
        error.response.data.message ||
          "Une erreur est survenue lors de la connexion."
      );
      throw error.response.data;
    }
  }
);

let academicStudentSlice = createSlice({
  name: "academicStudents",
  initialState: {
    academicStudents: [],
    loading: false,
    error: false,
    errorType: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicStudents.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.status = "idle";
      })
      .addCase(fetchAcademicStudents.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = false;
        state.academicStudents = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(fetchAcademicStudents.rejected, (state) => {
        state.loading = false;
        state.error = true;
        // state.errorType = action.payload;
        state.status = "rejected";
      })
      .addCase(addAcademicStudent.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.status = "idle";
      })
      .addCase(addAcademicStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.academicStudents = [...state.academicStudents, action.payload];
        state.status = "fulfilled";
      })
      .addCase(addAcademicStudent.rejected, (state) => {
        state.loading = false;
        state.error = true;
        // state.errorType = action.payload;
        state.status = "rejected";
      })
      .addCase(getSingleStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.academicStudents = [action.payload.data];
        state.status = "fulfilled";
      })
      .addCase(getSingleStudent.rejected, (state) => {
        state.loading = false;
        state.error = true;
        // state.errorType = action.payload;
        state.status = "rejected";
      })
      .addCase(updateAcademicStudent.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = false;
        // state.academicStudents = [action.payload];
        state.status = "fulfilled";
      })
      .addCase(updateAcademicStudent.rejected, (state) => {
        state.loading = false;
        state.error = true;
        // state.errorType = action.payload;
        state.status = "rejected";
      });
  },
});

export default academicStudentSlice.reducer;
