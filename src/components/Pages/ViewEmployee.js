import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Pagination, Table } from 'react-bootstrap';
import config from '../../config';
import swal from 'sweetalert';

const ViewEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeEmail, setEmployeeEmail] = useState([]);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //pagination
    const [currentPage, setCurrentPage] = useState(1);

    //previous page
    const handlePreviousChange = (e) => { 
        e.preventDefault();
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    //next page
    const handleNextChange = (e) => { 
        e.preventDefault();
        setCurrentPage(currentPage + 1);
    }

//get all employees
    useEffect(() => {
      fetch(`${config.apiServer}/getAllEmployees?page=${currentPage}&size=5`)
        .then((res) => res.json())
          .then((data) => {
          setEmployees(data);
        });
    }, [currentPage]);

    const handleCheckboxChange = (e,id) => { 
        employees?.employees?.map((employee) => {
          if (employee.id === id) {
              setEmployeeEmail([...employeeEmail, employee.email]);
          }
          return employee;
        });

  }
  
  //send email
    const handleSendEmail = (e) => { 
        e.preventDefault();
       
      const postData = {
        subject: subject,
        text: body,
        email: employeeEmail
      };

      fetch("http://localhost:5000/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            swal({
              title: "Success",
              text: data.message,
              icon: "success",
              buttons: true,
              dangerMode: true,
            });
          }
        });
      //modal close
    handleClose();
    }
    
    return (
      <>
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <h5>View Employees</h5>
            <div>
              <h6>Total Records- {employees?.totalRecords}</h6>
              <h6>Total Pages- {employees?.totalPages}</h6>
            </div>
          </div>
        </Container>
        <section style={{ height: "350px" }}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Select Employee</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {employees?.employees?.map((employee) => (
                <tr key={employee?.id}>
                  <td>
                    {" "}
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        handleCheckboxChange(e, employee?.id);
                      }}
                    />
                  </td>
                  <td>{employee?.firstName}</td>
                  <td>{employee?.lastName}</td>
                  <td>{employee?.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
        {/*Modal*/}
        <Button variant="warning" className="fw-bold" onClick={handleShow}>
          Send Email
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e)=>setSubject(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e)=>setBody(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSendEmail}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
        {/* pagination */}
        <Pagination size="lg">
          <Pagination.First onClick={handlePreviousChange} />
          <Pagination.Item>{currentPage}</Pagination.Item>
          <Pagination.Last onClick={handleNextChange} />
        </Pagination>
      </>
    );
};

export default ViewEmployee;