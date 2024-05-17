import { combineReducers } from "redux";
import authReducer from "./authSlice";
// import { configureStore } from "@reduxjs/toolkit";
import academicYearReducer from "./academicYearSlice";
import academicTermReducer from "./academicTermSlice";
import classLevelReducer from "./classSlice";
import academicProgramReducer from "./academicProgram";
import academicTeacherReducer from "./adminTeacherSlice";
import academicStudentReducer from "./adminStudentSlice";
import academicSubjectReducer from "./academicSubject";
import academicPaymentsReducer from "./paymentSlice";
// import academicYearReducer from "./academicYearReducer";
export const reducers = combineReducers({
  auth: authReducer,
  academicYearReducer,
  academicTermReducer,
  classLevelReducer,
  academicProgramReducer,
  academicTeacherReducer,
  academicSubjectReducer,
  academicStudentReducer,
  academicPaymentsReducer,
});
// export const store = configureStore({ auth: authReducer });
// export const store = configureStore({
//     reducer: {
//       auth: authReducer
//     },
//   })
