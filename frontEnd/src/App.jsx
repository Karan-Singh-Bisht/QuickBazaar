import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerRoutes from "./routes/CustomerRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRoutes />}></Route>
        <Route path="/admin/*" element={<AdminRoutes />}></Route>
      </Routes>
      <Toaster richColors />
    </div>
  );
};

export default App;
