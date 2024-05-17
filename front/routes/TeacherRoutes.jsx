import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Teacher/Home";
function TeacherRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default TeacherRoutes;
