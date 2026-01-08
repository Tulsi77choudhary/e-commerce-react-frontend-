import { Routes, Route } from "react-router-dom";
import Admin from "../Admin/Admin";

function AdminRouters() {
  return (
    <Routes>
      <Route path="/*" element={<Admin />} />
    </Routes>
  );
}

export default AdminRouters;