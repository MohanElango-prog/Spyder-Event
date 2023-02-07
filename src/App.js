import React, { useState } from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";
// import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";
import DropDown from "./Select1/DropDown";

function App({ }) {
	const [data, SetData] = useState([{ name: "" }]);
	const [formDetails, SetFormDetails] = useState({
		event: "",
		college: "",
		department: "",
	});
	const navigate = useNavigate();


	const optionb = [
		{ value: 'Quiz', label: "Quiz" },
		{ value: 'Paper Presentation', label: "Paper Presentation" },
		{ value: 'Debugging', label: "Debugging" },
		{ value: 'Marketing', label: "Marketing" },
		{ value: 'Poster Design', label: "Poster Design" },
		{ value: 'Ideathon', label: "Ideathon" },
		{ value: 'Dance', label: "Dance" },
	];

	const handleFormChange = (ind, e) => {
		let input = [...data];
		data[ind][e.target.name] = e.target.value;
		SetData(input);
	};
	const addFields = () => {
		let newfield = { name: "" };
		SetData([...data, newfield]);
	};
	const removeFields = (ind) => {
		let input = [...data];
		if (ind !== 0) input.splice(ind, 1);
		SetData(input);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(data);
		// axios.post("https://sheet.best/api/sheets/cfe8bcf1-26ad-4299-974e-f2dcc7fa98bd", data).then((response) => {
		//   console.log(response);
		// });

		navigate("/download", {
			state: { data, formDetails },
		});
	};
let limit = formDetails.event === "Debugging" ? 5 : 2;
	return (
		<Container fluid className="container">
			<Header as="h2">React google sheet</Header>
			<Form className="form">
				{/* <Form.Field>
					<DropDown
						isSearchable
						isMulti={false}
						placeHolder="Select Events"
						addNewOption={true}
						options={optionb}
						isClearable={true}
						onChange={(value) => console.log(value)} />
					</Form.Field> */}
					<Form.Field>
						<label>Event</label>
						<DropDown
							isSearchable
							isMulti={false}
							placeholder="Enter your Event"
							addNewOption={true}
							options={optionb}
							isClearable={true}
							onChange={(e) => SetFormDetails({ ...formDetails, event: e.target.value })} />
					</Form.Field>
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
								<Button style={{ margin: "0.5rem" }} onClick={() => removeFields(ind)}>Remove</Button>
							</div>
						);
					})}
					{limit > data.length ? <Button onClick={addFields}>Add</Button> : null}
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
				<Button color="blue" type="submit" onClick={handleSubmit}>
					Download Certificate and Continue
				</Button>
			</Form>
		</Container>
	);
}

export default App;
