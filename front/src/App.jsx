import "./main.scss";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
// import AcademicYear from "./pages/Admin/AcademicYear";
// import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PasswordForgot from "./pages/PasswordForgot";
import PasswordReset from "./pages/PasswordReset";
import AcademicTerm from "./pages/Admin/AcademicTerm";
import ClassLevel from "./pages/Admin/ClassLevel";
import AcademicProgram from "./pages/Admin/AcademicProgram";
import Teacher from "./pages/Admin/Teacher";
import TeacherCreate from "./pages/Admin/TeacherCreate";
import "react-phone-input-2/lib/style.css";
import TeacherInfo from "./pages/Admin/TeacherInfo";
import AcademicSubject from "./pages/Admin/AcademicSubject";
import SubjectCreate from "./pages/Admin/SubjectCreate";
import Home from "./pages/Teacher/Home";
import SubjectOperation from "./pages/SubjectOperation";
import Student from "./pages/Admin/Student";
import StudentCreate from "./pages/Admin/StudentCreate";
import StudentEdit from "./pages/Admin/StudentEdit";
import ClassCreate from "./pages/Admin/ClassCreate";
import ClassEdit from "./pages/Admin/ClassEdit";
import Payment from "./pages/Student/Payment";
import PaymentCreate from "./pages/Student/PaymentCreate";
import Payments from "./pages/Admin/Payments";
import RapportCreate from "./pages/Admin/RapportCreate";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/password-forgot" element={<PasswordForgot />} />
      <Route path="/password-reset/:token" element={<PasswordReset />} />

      <Route element={<ProtectedRoutes roles={["Admin"]} />}>
        <Route path="/admin/teacher" element={<Teacher />} />
        <Route path="/admin/students" element={<Student />} />
        <Route path="/admin/teacher/add" element={<TeacherCreate />} />
        <Route path="/admin/student/add" element={<StudentCreate />} />
        <Route path="/admin/student/edit/:id" element={<StudentEdit />} />
        <Route path="/admin/teacher/:id" element={<TeacherInfo />} />
        <Route path="/admin/terms" element={<AcademicTerm />} />
        <Route path="/admin/class" element={<ClassLevel />} />
        <Route path="/admin/class/create" element={<ClassCreate />} />
        <Route path="/admin/rapport" element={<RapportCreate />} />
        <Route path="/admin/program" element={<AcademicProgram />} />
        <Route path="/admin/subjects" element={<AcademicSubject />} />
        <Route path="/admin/subjects/create" element={<SubjectCreate />} />
        <Route path="/admin/subjects/edit/:_id" element={<SubjectCreate />} />
        <Route path="/admin/class/edit/:_id" element={<ClassEdit />} />
        <Route path="/payments" element={<Payments />} />
        <Route
          path="/admin/subjects/view/:_id"
          element={<SubjectOperation />}
        />
      </Route>
      <Route element={<ProtectedRoutes roles={["Student"]} />}>
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/create" element={<PaymentCreate />} />

      </Route>

      <Route element={<ProtectedRoutes roles={["Teacher"]} />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
