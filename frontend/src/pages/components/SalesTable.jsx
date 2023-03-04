import React, {useContext} from 'react';
import { Table } from 'react-bootstrap';
import { HomeContext } from '../../context/HomeContext';
import './styles.css'

function SalesTable() {

  const {
    data,
  } = useContext(HomeContext);

  /*  
    Itera através de todas as transações e, para cada transação, 
    verifican se já existe um objeto para o estado atual na variável "transactions". 
    Se não houver, cria um novo objeto com as chaves "qty" e "total" inicializadas com 0.
    Em seguida, incrementa "qty" e "total" com as informações da transação atual. 
    Depois, você está iterando através dos estados (que agora são as chaves do objeto "transactions") 
    e criando linhas na tabela para cada estado, exibindo a quantidade e o valor total das transações para cada estado.
  */

  /* 
   Agrupando as transações de acordo com o estado (efetuadas, negadas e outras) 
   e cria um objeto com a quantidade de transações e o valor total para cada estado.
 */
  
  const transactions = data.reduce((acc, transaction) => {
    if (!acc[transaction.estado]) {
      acc[transaction.estado] = {
        qty: 0,
        total: 0
      };
    }
    acc[transaction.estado].qty++;
    acc[transaction.estado].total += Number(transaction.valor);
    return acc;
  }, {});

  // Cria as linhas da tabela
  const rows = Object.keys(transactions).map(estado => (
    <tr key={estado}>
      <td>{estado}</td>
      <td>{transactions[estado].qty}</td>
      <td>{`R$ ${(
        transactions[estado].total)
        .toLocaleString()
        }`}
      </td>
    </tr>
  ));
  return (
    <div className="table-sales">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Estado</th>
          <th>Quantidade</th>
          <th>Valor Total</th>
        </tr>
      </thead>
      <tbody>
        {rows && rows}
      </tbody>
    </Table>
    </div>
  );
}

export default SalesTable;