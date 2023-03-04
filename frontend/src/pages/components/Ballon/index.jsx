import React, { useContext, useState } from 'react';
import { HomeContext } from '../../../context/HomeContext';
import { BsArrowUpCircleFill } from "react-icons/bs";
import AddMetas from './addMetas';
import UploadCSV from './ImportCSV';
import GenerateReport from '../GenerateReport'
import './styles.css';

const Ballon = () => {

  const [fileName, setFileName] = useState('Selecione');
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleFileChange,
  } = useContext(HomeContext);

  const handleFileChangeName = (event) => {
    setFileName(event.target.files[0].name);
    handleFileChange(event.target.files[0]);
  };

  const toggleAside = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <section className={`ballon-open ${isOpen ? 'open' : 'closed'}`}>
        <span className={`arrow-${isOpen ? 'open' : 'closed'}`} onClick={toggleAside}>
          <BsArrowUpCircleFill />
        </span>
        {isOpen && (
          <div className="btn-Ballon">
            <UploadCSV fileName={fileName} handleFileChangeName={handleFileChangeName} />
            <hr />
            <AddMetas />
            <hr />
            <GenerateReport />
          </div>
        )}
      </section>
    </div>
  );
};

export default Ballon;