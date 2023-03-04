import React, { useState, useEffect } from 'react';
import './styles.css';

const Report = ({
  data,
  dataOperators,
}) => {
  const [uniqueOperators, setUniqueOperators] = useState([]);

  useEffect(() => {
    setUniqueOperators([...new Set(data.map(item => item.operador))])
  }, [data, dataOperators]);

  const sortedOperators = uniqueOperators.sort((a, b) => {
    const operatorDataA = data.filter(dataItem => dataItem.operador === a && dataItem.estado === "Efetuada PDV ");
    const operatorDataB = data.filter(dataItem => dataItem.operador === b && dataItem.estado === "Efetuada PDV ");
    return operatorDataB.reduce(
      (total, item) => total + Number(item.valor), 0
    ) - operatorDataA.reduce(
      (total, item) => total + Number(item.valor), 0
    );
  });

  return (
    <div className="report-page">
      <table>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Vendas</th>
          </tr>
        </thead>
        <tbody>
          {sortedOperators.length > 0 &&
            sortedOperators.map((item) => {
              // Filtra dados por operador e estado "Efetuada PDV"
              const operatorData = data.filter(dataItem => dataItem.operador.toString() === item.toString() && dataItem.estado === "Efetuada PDV ");
              // Busca nome do operador
              const operator = dataOperators.find(operator => operator.registration.toString() === item.toString());
              return (
                <tr key={item}>
                  <td>{item}</td>
                  <td>{operator
                    ? operator.name
                    : <span style={{ color: 'red' }}>Não Cadastrado</span>}
                  </td>
                  <td>{operatorData.length}</td>
                  <td>R$ {operatorData.reduce((total, item) => total + Number(item.valor), 0)}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  );

}

export default Report;