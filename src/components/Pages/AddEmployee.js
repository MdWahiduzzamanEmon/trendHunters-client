import React from "react";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Col, Row } from "react-bootstrap";
import config from "../../config";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  //view page navigation
  const naviagteToViewEmployee = useNavigate();

  //form validation
  const AddEmployeeSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  //form submit
  const handleSubmit = (values) => {
    console.log(values);
    fetch(`${config.apiServer}/createEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          //success modal
          swal({
            title: "Employee Added Successfully",
            icon: "success",
            buttons: true,
            dangerMode: true,
          }).then((willSuccess) => {
            if (willSuccess) {
              //navigate to view page
              naviagteToViewEmployee("/viewEmployee");
            }
          });
        }
      })
      .catch((err) => {
        swal({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
      });
    };
    
  return (
    <Formik
      validationSchema={AddEmployeeSchema}
      onSubmit={(values, formikHelpers) => {
        handleSubmit(values);
        formikHelpers.resetForm();
      }}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Row className="w-75 mx-auto mt-5">
            <Col xs={12} md={12} className="my-3">
              {/* firstname field */}
              <Field
                name="firstName"
                type="text"
                placeholder="First Name"
                className={
                  "form-control" +
                  (errors.firstName && touched.firstName ? " is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors.firstName}</div>
            </Col>
            <Col xs={12} md={12} className="my-3">
              {/* lastname field */}
              <Field
                name="lastName"
                type="text"
                placeholder="Last Name"
                className={
                  "form-control" +
                  (errors.lastName && touched.lastName ? " is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors.lastName}</div>
            </Col>
            <Col xs={12} md={12} className="my-3">
              {/* email field */}
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={
                  "form-control" +
                  (errors.email && touched.email ? " is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors.email}</div>
            </Col>
          </Row>
          <div>
            {/* submit button */}
            <Button type="submit" variant="warning" className="fw-bold">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddEmployee;
