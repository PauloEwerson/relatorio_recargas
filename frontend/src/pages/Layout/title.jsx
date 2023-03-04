import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Title = ({ selectedOption }) => {
  return (
  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 className="h2">{selectedOption}</h1>
  </div>
  )
}

export default Title;