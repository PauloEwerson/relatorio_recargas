import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const Menu = () => {
  return (
      <div className="home-page-menu">
        <Link to="/">Dashboard</Link>
        <Link to="/operadores">Cadastro de Operadores</Link>
        <Link to="/relatorio">Exibir Ranking</Link>
      </div>
  );
};

export default Menu;

