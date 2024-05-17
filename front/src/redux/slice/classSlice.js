import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../config";
API.defaults.withCredentials = true;
export const fetchClassLevels = createAsyncThunk(
  "classLevels/fetchClassLevels",
  async () => {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    console.log(token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await API.get("/api/v1/class-levels");
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

export const getSingleClassLevel = createAsyncThunk(
  "classLevels/getSingleClassLevel",
  async (id) => {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await API.get(`/api/v1/class-levels/${id}`);
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

export const updateClassLevel = createAsyncThunk(
  "classLevels/updateClassLevel",
  async (newClassLevel) => {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await API.put(
        `/api/v1/class-levels/${newClassLevel._id}`,
        newClassLevel
      );
      console.log(response.data);
      toast.success(response.data.message);
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

export const addClassLevel = createAsyncThunk(
  "classLevels/addClassLevel",
  async (newClassLevel) => {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    // console.log(newClassLevel);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await API.post("/api/v1/class-levels", newClassLevel);
      console.log(response.data);
      toast.success(response.data.message);
      return response.data.classCreated;
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
const classLevelSlice = createSlice({
  name: "classLevel",
  initialState: {
    classLevel: [],
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
      .addCase(fetchClassLevels.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.status = "idle";
      })
      .addCase(fetchClassLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.classLevel = action.payload.data;
        state.error = false;
        state.status = "fulfilled";
      })
      .addCase(fetchClassLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "rejected";
      })
      .addCase(addClassLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "idle";
      })
      .addCase(addClassLevel.fulfilled, (state, action) => {
        state.loading = false;
        // state.classLevel = [...state.classLevel, action.payload.classCreated
        // ];
        state.status = "fulfilled";
        // state.academicYear.push(action.payload.academicYearCreated);
      })
      .addCase(addClassLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "rejected";
      })
      .addCase(getSingleClassLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "idle";
      })
      .addCase(getSingleClassLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.classLevel = [action.payload.data];
        state.status = "fulfilled";
      })
      .addCase(getSingleClassLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "rejected";
      })
      .addCase(updateClassLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "idle";
      })
      .addCase(updateClassLevel.fulfilled, (state, action) => {
        state.loading = false;
        // state.classLevel = [...state.classLevel, action.payload];
        state.status = "fulfilled";
      })
      .addCase(updateClassLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "rejected";
      });
  },
});

export const { openModal, closeModal } = classLevelSlice.actions;
export default classLevelSlice.reducer;
