import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import CertificateDownloader from "./Cdownloader";
// import { Sample, Test } from "./test";
const AppRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/download" element={<CertificateDownloader />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoute;
