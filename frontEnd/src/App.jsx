import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerRoutes from "./routes/CustomerRoutes";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRoutes />}></Route>
      </Routes>
    </div>
  );
};

export default App;
