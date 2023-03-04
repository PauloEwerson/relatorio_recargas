import React, { useContext, useEffect } from 'react';
import CountUp from '../components/CountUp'
import SalesTable from '../components/SalesTable';
import {
  Report,
} from '..';

import { HomeContext } from '../../context/HomeContext';
import { OperatorsContext } from '../../context/OperatorsContext';

const PrintPage = () => {

  const {
    data,
    fetchData,
    fetchMeta,
    update,
    setLastUpdate,
    isDataLoaded,
    setIsDataLoaded,

    meta,
  } = useContext(HomeContext);

  const {
    dataOperators,
  } = useContext(OperatorsContext);

  useEffect(() => {
    if (!isDataLoaded && data.length === 0) {
      fetchData();
      fetchMeta();
    } else if (data.length > 0) {
      fetchMeta();
      setLastUpdate(update)
    }
  }, [isDataLoaded, update, data.length, fetchData, fetchMeta, setIsDataLoaded, setLastUpdate]);

  return (

    <html>
      <head>
        <title>Página de Impressão</title>
      </head>
      <body>
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Relatório de Recargas</h1>
          <div className="home-page" style={{width: '100%'}}>
            <div>
              <h3>Meta R${(meta).toLocaleString()}</h3>
            </div>
            <CountUp />
            <SalesTable />
          </div>
          <h4 style={{ margin: '10px' }}>Rankin de Operadores</h4>
          <Report
            data={data}
            dataOperators={dataOperators}
          />
        </section>
      </body>
    </html>
  )
};

export default PrintPage;
