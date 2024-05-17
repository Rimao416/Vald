const routesConfig = {
  admin: [
    { path: "/admin/teacher", component: Teacher },
    { path: "/admin/teacher/add", component: TeacherCreate },
    // ... autres routes admin
  ],
  teacher: [
    { path: "/teacher", component: Teacher },
    { path: "/teacher/create", component: TeacherCreate },
    // ... autres routes teacher
  ],
  // ... autres rôles et leurs routes
};
export default routesConfig;
