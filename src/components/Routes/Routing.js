import React, { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const AddEmployee = React.lazy(() => import("../Pages/AddEmployee.js"));
const ViewEmployee = React.lazy(() => import("../Pages/ViewEmployee.js"));
const AddMultipleEmployee = React.lazy(() => import("../Pages/AddMultipleEmployee.js"));
const MainPage = React.lazy(() => import("../Home/index.js"));


const Routing = () => {
    return (
      <BrowserRouter>
        <Suspense fallback={<Spinner animation="border" />}>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="/addEmployee" element={<AddEmployee />} />
              <Route path="/viewEmployee" element={<ViewEmployee />} />
              <Route
                path="/addMultipleEmployee"
                element={<AddMultipleEmployee />}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
};

export default Routing;