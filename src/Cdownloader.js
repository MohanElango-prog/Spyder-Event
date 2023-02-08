import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { Link, useLocation } from "react-router-dom";
import { Button } from "semantic-ui-react";
import "./Cdownloader.css";
import certificate from "./Certificate.jpg";

const CertificateDownloader = () => {
  const [downloadAll, setDownloadAll] = useState(false);
  const location = useLocation();

  let nameData = location.state.data;
  let details = location.state.formDetails;

  let names = nameData
    .map((txt) => txt.name)
    .filter(function (item) {
      return typeof item === "string";
    });
  console.log(names);

  let data = nameData.map((item) => ({
    name: item.name,
    email: details.email,
    mobileNumber: details.mobileNumber,
    college: details.college,
    course: details.course,
    event: details.event,
    department: details.department,
  }));
  let eventObj = {
    quiz: { event: "Quiz", sheet: "https://sheet.best/api/sheets/9a7fc784-20dc-4ddc-8878-8e7d825f4610" },
    PP: { event: "Paper Presentation", sheet: "https://sheet.best/api/sheets/9a7fc784-20dc-4ddc-8878-8e7d825f4610" },
    DB: { event: "Debugging", sheet: "https://sheet.best/api/sheets/9a7fc784-20dc-4ddc-8878-8e7d825f4610" },
    marketing: { event: "Marketing", sheet: "https://sheet.best/api/sheets/9a7fc784-20dc-4ddc-8878-8e7d825f4610" },
    PD: { event: "Poster Design", sheet: "https://sheet.best/api/sheets/9a7fc784-20dc-4ddc-8878-8e7d825f4610" },
    Idea: { event: "Ideathon", sheet: "https://sheet.best/api/sheets/9a7fc784-20dc-4ddc-8878-8e7d825f4610" },
    Dance: { event: "Dance", sheet: "https://sheet.best/api/sheets/9a7fc784-20dc-4ddc-8878-8e7d825f4610" },
  };
  if (eventObj.quiz.event === details.event) {
    let { sheet } = eventObj.quiz;
    axios.post(sheet, data).then((response) => {
      console.log(response);
    });
  }
  if (eventObj.PP.event === details.event) {
    let { sheet } = eventObj.PP;
    axios.post(sheet, data).then((response) => {
      console.log(response);
    });
  }
  if (eventObj.DB.event === details.event) {
    let { sheet } = eventObj.DB;
    axios.post(sheet, data).then((response) => {
      console.log(response);
    });
  }
  if (eventObj.marketing.event === details.event) {
    let { sheet } = eventObj.marketing;
    axios.post(sheet, data).then((response) => {
      console.log(response);
    });
  }
  if (eventObj.PD.event === details.event) {
    let { sheet } = eventObj.PD;
    axios.post(sheet, data).then((response) => {
      console.log(response);
    });
  }
  if (eventObj.Idea.event === details.event) {
    let { sheet } = eventObj.Idea;
    axios.post(sheet, data).then((response) => {
      console.log(response);
    });
  }
  if (eventObj.Dance.event === details.event) {
    let { sheet } = eventObj.quiz;
    axios.post(sheet, data).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      {nameData.map((item) => {
        return (
          <Downloader
            key={Math.random()}
            state={{
              name: item.name,
              email: details.email,
              mobileNumber: details.mobileNumber,
              college: details.college,
              event: details.event,
              department: details.department,
            }}
            DC={downloadAll}
          />
        );
      })}
      {details.event === "Debugging" ? (
        <Link to={"https://forms.gle/4P9X6JJyhuievarr9"} target="_blank">
          <Button>Start Debugging</Button>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};

const Downloader = ({ state }) => {
  let certificateWrapper = useRef();
  // axios.post("https://sheet.best/api/sheets/01a29b8a-ad23-4bc0-b116-a2938c4cc7c1", state).then((response) => {
  //   console.log(response);
  // });

  const Download = () => {
    exportComponentAsPNG(certificateWrapper, {
      html2CanvasOptions: { backgroundColor: null },
    });
  };

  return (
    <div className="Download">
      <div id="downloadWrapper" ref={certificateWrapper}>
        <div id="certificateWrapper">
          <p className="certifyName">{state.name}</p>
          <p className="certifyCollege">{state.college}</p>
          <p className="certifyEvent">{state.event}</p>
          <img src={certificate} alt="Certificate" width={640} height={425} />
        </div>
      </div>
      <div className="Meta">
        <button
          onClick={() => {
            Download();
          }}
        >
          {" "}
          Download
        </button>
      </div>
    </div>
  );
};

export default CertificateDownloader;
