import React, { useEffect, useState } from "react";
import { Col, Container, Row, Offcanvas } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import "./Home.css";


const MainPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    document.title = "Swiss Eagle | DashBoard";
  }, []);

  return (
    <div>
      <div>
        <div className="d-none offCanvas-controller ">
          <div className=" d-flex justify-content-between align-items-center flex-bg px-3">
            <button
              className="border-0 bg-transparent"
              style={{ borderRadius: 0, textAlign: "left" }}
              onClick={handleShow}
            >
              <i style={{ color: "#cbba9c" }} className="fas fa-3x fa-bars"></i>
            </button>
            <div className="my-5 fs-3 fw-bold">-Trend Hunters-</div>
          </div>
        </div>

        {/* offCanvas menu  */}
        <Offcanvas
          className="d-none handle-canvas w-75"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fs-2 hed-color">
              Dashboard
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="canvas-body text-left">
            <>
              <div
                onClick={handleClose}
                className="d-flex justify-content-start align-items-center"
              >
                <i className="fas fa-shopping-basket me-2"></i>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "text-dark"
                  }
                  to="/viewEmployee"
                >
                  View Employee
                </NavLink>
              </div>
              <br />
              <div
                onClick={handleClose}
                className="d-flex justify-content-start align-items-center"
              >
                <i className="fas fa-comment me-2"></i>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "text-dark"
                  }
                  to="/addEmployee"
                >
                  Add Employee
                </NavLink>
              </div>
              <br />
              <div
                onClick={handleClose}
                className="d-flex justify-content-start align-items-center"
              >
                <i className="fas fa-comment me-2"></i>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "text-dark"
                  }
                  to="/addMultipleEmployee"
                >
                  Add Multiple Employee
                </NavLink>
              </div>
              <br />
            </>
          </Offcanvas.Body>
        </Offcanvas>

        {/* //desktop */}
        <div>
          <div className="my-4 fs-3 fw-bold">-Trend Hunters-</div>
          <Container fluid>
            <Row>
              <Col className="my-col text-left pt-5" lg={2}>
                <div className="d-flex justify-content-start align-items-center">
                  <i className="fas fa-comment me-2"></i>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-primary" : "text-dark"
                    }
                    to="/viewEmployee"
                  >
                    View Employee
                  </NavLink>
                </div>
                <br />
                <div className="d-flex justify-content-start align-items-center">
                  <i className="fas fa-shopping-basket me-2"></i>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-primary" : "text-dark"
                    }
                    to="/addEmployee"
                  >
                    Add Employee
                  </NavLink>
                </div>
                <br />
                <div
                  onClick={handleClose}
                  className="d-flex justify-content-start align-items-center"
                >
                  <i className="fas fa-comment me-2"></i>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-primary" : "text-dark"
                    }
                    to="/addMultipleEmployee"
                  >
                    Add Multiple Employee
                  </NavLink>
                </div>
                <br />
              </Col>
              <Col
                xs={12}
                lg={10}
                style={{
                  backgroundColor: "#f4f7fc",
                  minHeight: "100vh",
                }}
              >
                <Outlet />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
