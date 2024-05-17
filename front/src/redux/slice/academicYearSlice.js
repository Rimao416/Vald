import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";
API.defaults.withCredentials = true;
import { toast } from "react-toastify";


export const fetchAcademicYears = createAsyncThunk(
  "academicYears/fetchAcademicYears",
  async () => {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await API.get("/api/v1/academic-years");
      console.log(response.data.data);
      // toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message ||
          "Une erreur est survenue lors de la connexion."
      );
      throw error.response.data;
    }
  }
);

// Action asynchrone pour ajouter une année académique
export const addAcademicYear = createAsyncThunk(
  "academicYears/addAcademicYear",
  async (newAcademicYear) => {
    try {
      const response = await API.post(
        "/api/v1/academic-years",
        newAcademicYear
      );
      console.log(response);
      toast.success(response.data.message);
      return response.data.academicYearCreated;
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

let academicYearsSlice = createSlice({
  name: "academicYears",
  initialState: {
    academicYear: [],
    loading: false,
    error: false,
    errorType: null,
    status: "idle",
  },
  reducers: {
    openModal(state) {
      state.status = "idle";
    },
    closeModal(state) {
      state.status = "fulfilled";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicYears.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.status = "idle";
      })
      .addCase(fetchAcademicYears.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.academicYear = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(fetchAcademicYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "rejected";
      })
      .addCase(addAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "idle";
      })
      .addCase(addAcademicYear.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.academicYear = [...state.academicYear, action.payload];
        state.status = "fulfilled";
        // state.academicYear.push(action.payload.academicYearCreated);
      })
      .addCase(addAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "rejected";
      });
  },
});
export const { openModal, closeModal } = academicYearsSlice.actions;
export default academicYearsSlice.reducer;
