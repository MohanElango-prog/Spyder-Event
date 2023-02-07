import React, { useState } from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import DropDown from "./Select1/DropDown";

function App() {
  const [data, SetData] = useState([{ name: "" }]);
  const [formDetails, SetFormDetails] = useState({
    event: "",
    college: "",
    department: "",
    email: "",
    mobileNumber: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const optionb = [
    { value: "Quiz", label: "Quiz" },
    { value: "Paper Presentation", label: "Paper Presentation" },
    { value: "Debugging", label: "Debugging" },
    { value: "Marketing", label: "Marketing" },
    { value: "Poster Design", label: "Poster Design" },
    { value: "Ideathon", label: "Ideathon" },
    { value: "Dance", label: "Dance" },
  ];

  const handleFormChange = (ind, e) => {
    let input = [...data];
    data[ind][e.target.name] = e.target.value;
    if (e) {
      /^[^\d]+$/.test(e.target.value) ? setError(false) : setError(true);
    }
    SetData(input);
  };
  const addFields = () => {
    let newfield = { name: "" };
    SetData([...data, newfield]);
  };
  const removeFields = (ind) => {
    let input = [...data];
    if (ind !== 0) {
      input.splice(ind, 1);
    }
    SetData(input);
  };
  const removePerEvents = (event) => {
    let input = [...data];
    if (event !== "Marketing") {
      input.splice(2, 3);
    }
    SetData(input);
  };

  const EValidation = (e) => {
    if (e) {
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value) ? setError(false) : setError(true);
    }
  };
  const MValidation = (e) => {
    if (e) {
      /^[0-9]{10}$/.test(e.target.value) ? setError(false) : setError(true);
    }
  };
  const handleSubmit = (e) => {
    console.log(formDetails);
    if (formDetails.college && formDetails.department && formDetails.email && formDetails.email && formDetails.event && formDetails.mobileNumber) {
      if ([...data].every((item) => item.name !== "")) {
        e.preventDefault();
        navigate("/download", { state: { data, formDetails } });
      } else {
        setError(true);
      }
    } else setError(true);
  };
  return (
    <Container fluid className="container">
      <Header as="h2">React google sheet</Header>
      <Form className="form">
        <Form.Field>
          <label>Event</label>
          <DropDown
            isSearchable
            isMulti={false}
            placeholder="Enter your Event"
            addNewOption={true}
            options={optionb}
            isClearable={true}
            onChange={(e) => {
              SetFormDetails({ ...formDetails, event: e.value });
              removePerEvents({ event: e.value });
            }}
          />
        </Form.Field>
        {formDetails.event !== "" ? (
          <Form.Field>
            <label>Name</label>
            {data.map((input, ind) => {
              return (
                <div style={{ display: "flex", gap: "10px" }} key={ind}>
                  <input
                    name="name"
                    value={input.name}
                    style={{ margin: "0.5rem" }}
                    placeholder="Enter your Name"
                    onChange={(e) => {
                      handleFormChange(ind, e);
                    }}
                  />
                  {ind !== 0 ? (
                    <Button style={{ margin: "0.5rem" }} onClick={() => removeFields(ind)}>
                      Remove
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
            {(formDetails.event === "Marketing" ? 5 : 2) > data.length ? <Button onClick={addFields}>+Add Names</Button> : null}
          </Form.Field>
        ) : (
          <></>
        )}
        <Form.Field>
          <label>Email</label>
          <input
            name="Email"
            placeholder="Enter your Email"
            onChange={(e) => {
              SetFormDetails({
                ...formDetails,
                email: e.target.value,
              });
              EValidation(e);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Mobile Number</label>
          <input
            name="Mobile Number"
            type={"number"}
            placeholder="Enter your Mobile Number"
            onChange={(e) => {
              SetFormDetails({
                ...formDetails,
                mobileNumber: e.target.value,
              });
              MValidation(e);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>College</label>
          <input name="college" placeholder="Enter your College" onChange={(e) => SetFormDetails({ ...formDetails, college: e.target.value })} />
        </Form.Field>
        <Form.Field>
          <label>Department</label>
          <input
            name="department"
            placeholder="Enter your Department"
            onChange={(e) => SetFormDetails({ ...formDetails, department: e.target.value })}
          />
        </Form.Field>
        <Form.Field>{error ? <span style={{ color: "red" }}>Enter Valid Details</span> : <></>}</Form.Field>
        <Button color="blue" type="submit" onClick={handleSubmit}>
          Download Certificate and Continue
        </Button>
      </Form>
    </Container>
  );
}

export default App;
