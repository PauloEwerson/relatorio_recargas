import React from "react";
import './style.css';

const FileButton = ({ variant }) => (
  <div className={`file file--${variant}`}>
    <label htmlFor="input-file">
      <i className="material-icons">
        {variant === "queue"
          ? "cloud_queue"
          : variant === "upload"
          ? "cloud_upload"
          : variant === "uploading"
          ? "cloud_upload"
          : variant === "success"
          ? "cloud_done"
          : variant === "danger"
          ? "cloud_off"
          : "lock"}
      </i>
      {variant === "queue"
        ? "Select a file"
        : variant === "upload"
        ? "Upload"
        : variant === "uploading"
        ? "Uploading"
        : variant === "success"
        ? "Success"
        : variant === "danger"
        ? "Error"
        : "Disabled"}
    </label>
    <input id="input-file" type="file" />
  </div>
);

const Buttons = () => (
  <div className="container">
    <h1>Buttons</h1>
    <div className="variants">
      <FileButton variant="queue" />
      <FileButton variant="upload" />
      <FileButton variant="uploading" />
      <FileButton variant="success" />
      <FileButton variant="danger" />
      <FileButton variant="disabled" />
    </div>
  </div>
);

export default Buttons;
