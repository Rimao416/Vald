import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { API } from "../../config";
API.defaults.withCredentials = true;
export const fetchAcademicTerms = createAsyncThunk(
  "academicTerms/fetchAcademicTerms",
  async () => {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    console.log(token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await API.get("/api/v1/academic-terms");
      console.log(response.data);
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

export const addAcademicTerm = createAsyncThunk(
  "academicTerms/addAcademicTerm",

  async (newAcademicTerm) => {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await API.post(
        "/api/v1/academic-terms",
        newAcademicTerm
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

const academicTermsSlice = createSlice({
  name: "academicTerms",
  initialState: {
    academicTerm: [],
    loading: false,
    error: false,
    errorType: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicTerms.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAcademicTerms.fulfilled, (state, action) => {
        state.loading = false;
        state.academicTerm = action.payload.data;
        state.error = false;
      })
      .addCase(fetchAcademicTerms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAcademicTerm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAcademicTerm.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.academicTerm = [...state.academicTerm, action.payload];
      })
      .addCase(addAcademicTerm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default academicTermsSlice.reducer;
