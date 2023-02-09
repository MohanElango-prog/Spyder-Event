import React, { useRef } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { Link, useLocation } from "react-router-dom";
import { Button } from "semantic-ui-react";
import "./Cdownloader.css";
import certificate from "./Assets/Spder-Certificate.jpg";

const CertificateDownloader = () => {
  const location = useLocation();
  let teamData = location.state.teamData;

  let debugging = teamData.map((item) => item.event === "Debugging");

  return (
    <div className="DownloadContainer">
      {teamData.map((item) => {
        return (
          <Downloader
            key={Math.random()}
            state={{
              name: item.name,
              email: item.email,
              mobileNumber: item.mobileNumber,
              college: item.college,
              course: item.course,
              event: item.event,
              department: item.department,
            }}
          />
        );
      })}
      {debugging.includes(true) ? (
        <Link to={"https://forms.gle/4P9X6JJyhuievarr9"} target="_blank">
          <Button style={{ margin: "10px" }}>Start Debugging</Button>
        </Link>
      ) : (
        <h3 style={{ margin: "10px" }}>Thanks for Participating</h3>
      )}
    </div>
  );
};

const Downloader = ({ state }) => {
  let certificateWrapper = useRef();

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
        <Button
          onClick={() => {
            Download();
          }}
        >
          {" "}
          Download
        </Button>
      </div>
    </div>
  );
};

export default CertificateDownloader;
