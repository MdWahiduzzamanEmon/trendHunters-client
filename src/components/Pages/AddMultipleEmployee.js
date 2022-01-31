import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import config from '../../config';
import classes from "./AddMultipleEmployee.module.css";


const AddMultipleEmployee = () => {
    const [file, setFile] = useState(null);
    const formData = new FormData();
    const naviagteToViewEmployee =useNavigate();
    //fileType: 'text/csv'
    const fileTypes = ["CSV"];

    //fileUpload
    const handleChange = (file) => {
        setFile(file);
      
    };

    //submit
    const handleSubmit = (e) => { 
        e.preventDefault();
        formData.append("file", file);
        fetch(`${config.apiServer}/createMultipleEmployee`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              //success modal
              swal({
                title: "Multiple Employees Added Successfully",
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
    }
    return (
        <>
      <div className={classes.App}>
        <h1>Drag & Drop or Click to upload Multiple Employees</h1>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
            <p className='my-3 fw-bold'>{file ? `File name: ${file.name}` : "No files uploaded yet"}</p>
            
        </div>
        <div>
                <Button variant="warning" className="fw-bold" onClick={(e) => {
                    handleSubmit(e)
                }}>
                    Submit
                </Button>
            </div>
        </>
    );
};

export default AddMultipleEmployee;