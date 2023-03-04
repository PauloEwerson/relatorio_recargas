import React, { useState, useContext, useEffect } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/SideBar';
import Ballon from '../components/Ballon';
import Toast from '../components/Toast'
import Title from './title';
import Footer from '../components/Footer';
import Loading from '../components/Loading'
import './styles.css';

import { MessageContext } from '../../context/Message';
import { HomeContext } from '../../context/HomeContext';
import { OperatorsContext } from '../../context/OperatorsContext';

import {
  Home,
  Operadores,
  Report,
} from '../../pages';

const Layout = () => {
  const [selectedOption, setSelectedOption] = useState('Dashboard');

  const {
    data,
    fetchData,
    fetchMeta,
    isDataLoaded,
    setIsDataLoaded,
    update,
    setLastUpdate,
  } = useContext(HomeContext);

  const {
    fetchOperators,
    dataOperators,
  } = useContext(OperatorsContext);

  const {
    message,
  } = useContext(MessageContext);

  useEffect(() => {
    if (!isDataLoaded && data.length === 0) {
      fetchData();
      fetchMeta();
      fetchOperators();
    } else if (data.length > 0) {
      setIsDataLoaded(true);
      fetchMeta();
      setLastUpdate(update)
      fetchOperators();
    }
  }, [data.length]);

  return (
    <div className="layout">
      {!isDataLoaded && <Loading />}
      <div className="section-menu-main">
        <section className="menu">
          <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </section>
        <section className="main">
          <div className='main-content'>
            <Title selectedOption={selectedOption} />
            <div>
              {selectedOption === 'Dashboard' && <Home />}
              {selectedOption === 'Ranking' && <Report
                data={data}
                dataOperators={dataOperators}
              />}
              {selectedOption === 'Cadastrar' && <Operadores />}
            </div>
          </div>
        </section>
      </div>
      <Toast message={message.message} status={message.status} />
      <span className="ballon">
        <Ballon />
      </span>
      <section className="footer">
        <Footer />
      </section>
    </div>
  );
};

export default Layout;