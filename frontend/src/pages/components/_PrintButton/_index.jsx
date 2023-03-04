import React, { useRef } from 'react';
import {AiFillPrinter} from 'react-icons/ai';

const PrintButton = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    printRef.current.contentWindow.print();
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <h5 style={{ marginRight: '1rem' }}>Gerar Relatório:</h5>
        <button onClick={handlePrint}><AiFillPrinter /></button>
      </div>

      <iframe
        ref={printRef}
        style={{ display: 'none' }}
        title="Print Page"
        src={`/print`}
      />
    </>
  );
};

export default PrintButton;

