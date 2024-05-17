import { Route, Routes } from "react-router-dom";
import AcademicTerm from "../src/pages/Admin/AcademicTerm";
import ClassLevel from "../src/pages/Admin/ClassLevel";
import SubjectCreate from "../src/pages/Admin/SubjectCreate";
import Teacher from "../src/pages/Admin/Teacher";
import TeacherCreate from "../src/pages/Admin/TeacherCreate";
import TeacherInfo from "../src/pages/Admin/TeacherInfo";
import AcademicProgram from "../src/redux/slice/academicProgram";
import AcademicSubject from "../src/redux/slice/academicSubject";
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/teacher" element={<Teacher />} />
      <Route path="/admin/teacher/add" element={<TeacherCreate />} />
      <Route path="/admin/teacher/:id" element={<TeacherInfo />} />
      <Route path="/admin/terms" element={<AcademicTerm />} />
      <Route path="/admin/class" element={<ClassLevel />} />
      <Route path="/admin/program" element={<AcademicProgram />} />
      <Route path="/admin/subjects" element={<AcademicSubject />} />
      <Route path="/admin/subjects/create" element={<SubjectCreate />} />
      <Route path="/admin/subjects/edit/:_id" element={<SubjectCreate />} />
    </Routes>
  );
}

export default AdminRoutes;
