import React, { useRef } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { useLocation } from "react-router-dom";
import "./Cdownloader.css";
import certificate from "./Certificate.jpg";

const CertificateDownloader = () => {
  const location = useLocation();
  let nameData = location.state.data;
  let details = location.state.formDetails;
  console.log(location.state);
  return nameData.map((item) => <Downloader key={Math.random()} state={{ name: item.name, college: details.college, event: details.event }} />);
};

const Downloader = ({ state }) => {
  let certificateWrapper = useRef();
  const Downloader = () => {
    exportComponentAsPNG(certificateWrapper, {
      html2CanvasOptions: { backgroundColor: null },
    });
  };
  return (
    <div className="App">
      <div className="Meta">
        <button
          onClick={() => {
            Downloader();
          }}
        >
          {" "}
          Download
        </button>
      </div>

      <div id="downloadWrapper" ref={certificateWrapper}>
        <div id="certificateWrapper">
          <p className="certifyName">{state.name}</p>
          <p className="certifyCollege">{state.college}</p>
          <p className="certifyEvent">{state.event}</p>
          <img src={certificate} alt="Certificate" width={640} height={425} />
        </div>
      </div>
    </div>
  );
};

export default CertificateDownloader;
