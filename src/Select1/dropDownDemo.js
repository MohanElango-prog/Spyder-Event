import Dropdown from "./DropDown";

 const DropDownDemo=()=> {
  const options = [
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "orange", label: "Orange" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
    { value: "grey", label: "Grey" }
  ];

  return (
    <>
    <style>
        {`
        .App{
            display:flex;
            column-gap: 10px;
            text-align: center;
            margin: 30px;
        }
        .App > * {
            flex :1
        }
        `}
    </style>
    <div className="App">
      <Dropdown
        isSearchable
        isMulti={false}
        placeHolder="Select..." addNewOption={true}
        options={options}isClearable={true}
        onChange={(value) => console.log(value)}
      />

      <Dropdown
        isSearchable
        isMulti
        placeHolder="Select..."
        options={options} isClearable={true}
        onChange={(value) => console.log(value)}
      />
    </div>
    </>
  );
}

export default DropDownDemo;