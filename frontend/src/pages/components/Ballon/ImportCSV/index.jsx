import React, { useContext, useState } from "react";
import { HomeContext } from "../../../../context/HomeContext";
import { AiOutlineUpload } from "react-icons/ai";

const UploadCSV = ({ fileName, handleFileChangeName }) => {
  const { lastUpdate, handleUpload } = useContext(HomeContext);
  const [selectedFile, setSelectedFile] = useState(false);

  return (
    <div>
      <form action="">
        <label htmlFor="csv_upload">Importar CSV</label>
        <div className="upload-btn">
          <input
            className="button-input"
            id="csv_upload"
            name="csv_upload"
            type="file"
            accept=".csv"
            onChange={(e) => {
              handleFileChangeName(e);
              setSelectedFile(true);
            }}
          />
          <button type="button" htmlFor="csv_upload" tabIndex="-1" title="Upload">
            <AiOutlineUpload />
          </button>
          <input
            className="button-input"
            id="csv_name"
            name="csv_name"
            type="text"
            placeholder={fileName}
            disabled
          />
        </div>
        <button
          className="button-input"
          id="reset-btn"
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Enviar
        </button>
      </form>
      <div className="data-last-imported">
        {lastUpdate ? (
          <>
            <p>Última importação: </p>
            <p>{lastUpdate}</p>
          </>
        ) : (
          <p>Não há dados importados</p>
        )}
      </div>
    </div>
  );
};

export default UploadCSV;