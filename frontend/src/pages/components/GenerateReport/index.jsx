import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { HomeContext } from '../../../context/HomeContext';
import { OperatorsContext } from '../../../context/OperatorsContext';
import MedalOuro from '../../../helpers/imgs/medal-ouro.png'
import MedalPrata from '../../../helpers/imgs/medal-prata.png'
import MedalBronze from '../../../helpers/imgs/medal-bronze.png'
import logo from '../../../helpers/imgs/logo-atacadao.png'
import {AiFillPrinter} from 'react-icons/ai';

const GenerateReport = () => {
  const [loaded, setLoaded] = useState(false);
  const [uniqueOperators, setUniqueOperators] = useState([]);

  const {
    data,
    meta,
  } = useContext(HomeContext);

  const {
    dataOperators,
  } = useContext(OperatorsContext);


  useEffect(() => {
    if (data.length > 0) {
      setLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    setUniqueOperators([...new Set(data.map(item => item.operador))])
  }, [data, dataOperators]);

  /* Home - CountUp */
  const today = moment().startOf('day');
  const firstDayOfMonth = moment().startOf('month');
  const numberOfDays = today.diff(firstDayOfMonth, 'days') + 1;
  const totalSales = data.reduce((acc, transaction) => {
    if (transaction.estado === 'Efetuada PDV ') {
      acc += Number(transaction.valor);
      return acc;
    }
    return acc;
  }, 0);
  
  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);
  const todaySplit = dateNow.toISOString().split("T")[0];
  const todaySales = data.reduce((acc, transaction) => {
    const data = new Date(transaction.data);
    const dia = data.getUTCDate().toString().padStart(2, '0');
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
    const ano = data.getUTCFullYear();
    const dataCorrigida = `${ano}-${dia}-${mes}`;
    if (transaction.estado === "Efetuada PDV " && dataCorrigida === todaySplit) {
      return acc + parseFloat(transaction.valor);
    }
    return acc;
  }, 0);
  const averageSalesPerDay = totalSales / numberOfDays;
  const remainingSales = meta - totalSales;
  const todayDate = new Date();
  const daysRemaining = remainingSales / averageSalesPerDay;
  const projectedDate = new Date();
  projectedDate.setDate(todayDate.getDate() + daysRemaining);
  const percentageAchieved = ((totalSales / meta) * 100).toFixed(2);
  let colorClass = "";
  const endOfMonth = moment().endOf('month');
  const daysLeft = endOfMonth.diff(today, 'days');
  const dailyTarget = (meta - totalSales) / daysLeft;
  if (dailyTarget > averageSalesPerDay) {
    colorClass = "red";
  } else if (dailyTarget >= (averageSalesPerDay / 2)) {
    colorClass = "blue";
  } else {
    colorClass = "green";
  }

  /* SalesTable */
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

  /* RANKING */
  const sortedOperators = uniqueOperators.sort((a, b) => {
    const operatorDataA = data.filter(dataItem => dataItem.operador === a && dataItem.estado === "Efetuada PDV ");
    const operatorDataB = data.filter(dataItem => dataItem.operador === b && dataItem.estado === "Efetuada PDV ");
    return operatorDataB.reduce(
      (total, item) => total + Number(item.valor), 0
    ) - operatorDataA.reduce(
      (total, item) => total + Number(item.valor), 0
    );
  });
  const tableRanking = sortedOperators.map((item) => {
    const operatorData = data.filter(dataItem => dataItem.operador.toString() === item.toString() && dataItem.estado === "Efetuada PDV ");
    const operator = dataOperators.find(operator => operator.registration.toString() === item.toString());
    const operatorName = operator ? operator.name : 'Não Cadastrado'
    return {
      registration: item,
      name: operatorName,
      qty: operatorData.length,
      total: operatorData.reduce((total, item) => total + Number(item.valor), 0)
    }
  })

/* Data de Impressão */
const day = (`0${dateNow.getDate()}`).slice(-2);
const month = (`0${dateNow.getMonth() + 1}`).slice(-2);
const year = dateNow.getFullYear();
const dataPrint = (`${day}/${month}/${year}`);

  const handlePrint = () => {
    
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <title>Imprimir</title>
          <style>
            * {
            border: 0;
            margin: 0;
            padding: 0;
          }
            #root {
              padding: 5px;
              --bg: rgb(213, 213, 213);
              --bgMenu: #fd7e14;
              --buttonBg: #f35727;
              --buttonHoverBg: #e84f20;
              --bgActive: #df4d20;
              --formBg: #fff;
              --inputBorder: #abafba;
              --inputBg: #fff;
              --inputDisableBg: #e3e4e8;
              --pColor: #17181c;
              --bgFooter:rgb(171, 171, 171);
            }
            .home-page {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              width: 100%;
            }
            .home-page th {
              color: rgb(255, 255, 255);
            }

            header {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              width: 100%;
              padding: 20px;
            }

            header h1 {
              fontSize: "30px",
              fontWeight: "bold",
            }

            #countdown-wrap {
              width: 90%;
              padding: 20px;
              font-family: arial;
              margin-bottom: 2rem;
            }
            
            #goal {
              font-size: 30px;
              text-align: right;
              color: rgb(0, 0, 0);
              @media only screen and (max-width : 640px) {
                text-align: center;
              }
            }
            
            #glass {
              width: 100%;
              height: 20px;
              background-color: #c7c7c7;
              border-radius: 10px;
              float: left;
              overflow: hidden;
            }
            
            #progress {
              float: left;
              height: 20px;
              z-index: 333;
              color: #fff;
              font-weight: bold;
            }

            .goal-stat-content {
              width: 100%;
              background: green;
            }
            
            .goal-stat {
              width: 20%;
              float: left;
              margin-top: 0.5rem;
              color: rgb(0, 0, 0);
            }
            
            .progress-bar-red {
              background-color: red;
            }
            
            .progress-bar-blue {
              background-color: blue;
            }
            
            .progress-bar-green {
              background-color: green;
            }
            
            .goal-number, .goal-label {
              display: block;
            }
            
            .goal-number {
              font-weight: bold;
            }

            .section-table-estados {
              width: 90%;
            }

            .section-table-estados table {
              width: 100%;
            }

            .section-table-estados td {
              border: 4px solid rgb(221, 221, 221);
              text-align: center;
            }

            .table-estados thead {
              background-color: rgb(0, 0, 0);
            }

            .ranking {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              width: 90%;
              padding: 0 1rem 3rem 1rem;
            }

            .ranking h2 {
              margin-top: 1rem;
            }

            .ranking table {
              width: 100%;
              text-align: center;
              margin-top: 0;
              margin-bottom: 20px;
              margin-left: 20px;
              margin-right: 20px;
            }

            .ranking thead {
              background-color: rgb(0, 0, 0);
            }

            .rnk-tr-1 {
              width: 10%;
            }
            .rnk-tr-2 {
              width: 15%;
            }
            .rnk-tr-3 {
              width: 35%;
            }
            .rnk-tr-4 {
              width: 15%;
            }
            .rnk-tr-5 {
              width: 25%;
            }

            .ranking img {
              width: 20px;
            }

            .ranking table:first-of-type tbody {
              background-color: var(--bg);
            }

            footer {
              text-align: center;
              width: 100%;
            }

            .footer-content {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-around;
              width: 100%;
              color: black;
            }

            .footer-content-left img {
              width: "50px",
              height: "50px",
              margin: "0 20px"
            }
          
          </style>
        </head>
        <body>
          <div id="root">
            <div class="home-page">
            <header>
              <h1>Relatório de Recargas</h1>
            </header>
            <div id="countdown-wrap">
                <span class="progress-bar-${colorClass}"></span>
                <div id="goal">Meta R${(meta).toLocaleString()}</div>
                <div id="glass">
                  <div
                    id="progress"
                    class=progress-bar-${colorClass}
                    style={{ width: ${percentageAchieved}% }}
                  >
                    ${percentageAchieved}%
                  </div>
                </div>
                <section class="goal-stat-content">
                  <div class="goal-stat">
                    <span class="goal-number">R$ ${(
                      dailyTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    )}</span>
                    <span class="goal-label">Meta / dia</span>
                  </div>
                  <div class="goal-stat">
                    <span class="goal-number">R$ ${(
                      todaySales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    )}</span>
                    <span class="goal-label">Venda / dia</span>
                  </div>
                  <div class="goal-stat">
                    <span class="goal-number">R$ ${(
                      averageSalesPerDay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    )}</span>
                    <span class="goal-label">Média / mês</span>
                  </div>
                  <div class="goal-stat">
                    <span class="goal-number">
                      <div id="countdown"></div>
                    </span>
                    <span class="goal-number">R$ ${(
                      remainingSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    )}</span>
                    <span class="goal-label">Falta</span>
                  </div>
                  <div class="goal-stat">
                    <span class="goal-number">${projectedDate.toLocaleDateString()}</span>
                    <span class="goal-label">Projeção</span>
                  </div>
                </section>
              </div>
            
              <section class="section-table-estados">
                <table class="table-estados">
                  <thead>
                    <tr>
                      <th>Estado</th>
                      <th>Quantidade</th>
                      <th>Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${transactions['Efetuada PDV '] ? (
                    `
                      <tr key={'Efetuada PDV '}>
                        <td>Efetuada PDV</td>
                        <td>${transactions['Efetuada PDV '].qty}</td>
                        <td>R$ ${(transactions['Efetuada PDV '].total).toLocaleString()}
                      <tr>
                    `
                    ) : (
                      ''
                    )
                    }
                    ${transactions['Cancelada PDV'] ? (
                    `
                      <tr key={Cancelada PDV}>
                        <td>Cancelada PDV</td>
                        <td>${transactions['Cancelada PDV'].qty}</td>
                        <td>R$ ${(transactions['Cancelada PDV'].total).toLocaleString()}
                      <tr>
                    `
                    ) : (
                      ''
                    )
                    }
                    ${transactions['Negada'] ? (
                    `
                      <tr key={Negada}>
                        <td>Negada</td>
                        <td>${transactions['Negada'].qty}</td>
                        <td>R$ ${(transactions['Negada'].total).toLocaleString()}
                      <tr>
                    `
                    ) : (
                      ''
                    )
                  }
                  </tbody>
                </table>
              </section>

              <section class="ranking">
                  <h2> - Top 3 - </h2>
                    <table>
                      <thead>
                        <tr>
                          <th class="rnk-tr-1">Posição</th>
                          <th class="rnk-tr-2">Matrícula</th>
                          <th class="rnk-tr-3">Nome</th>
                          <th class="rnk-tr-4">Quantidade</th>
                          <th class="rnk-tr-5">Vendas</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${tableRanking.slice(0, 3).map((item, index) => `
                          <tr key=${item.registration}-${index}>
                            <td><img src=${index === 0 ? MedalOuro : index === 1 ? MedalPrata : MedalBronze} /></td>
                            <td>${item.registration}</td>
                            <td>${item.name}</td>
                            <td>${item.qty}</td>
                            <td>R$ ${item.total}</td>
                          </tr>
                          `)}
                      </tbody>
                    </table>

                  <h3>Menção Honrosa</h3>
                  <table>
                    <thead>
                      <tr>
                        <th class="rnk-tr-1">Posição</th>
                        <th class="rnk-tr-2">Matrícula</th>
                        <th class="rnk-tr-3">Nome</th>
                        <th class="rnk-tr-4">Quantidade</th>
                        <th class="rnk-tr-5">Vendas</th>
                      </tr>
                    </thead>
                    <tbody>
                    ${tableRanking.slice(3).map((item, index) => `
                      <tr key=${item.registration}-${index + 3}>
                        <td>${index + 4} °</td>
                        <td>${item.registration}</td>
                        <td>${item.name}</td>
                        <td>${item.qty}</td>
                        <td>R$ ${item.total}</td>
                      </tr>
                    `)}
                    </tbody>
                  </table>
              </section>

            </div>
          </div>
        </body>
        <footer>
          <div class="footer">
            <div class="footer-content">
              <div class="footer-content-left">
                <img src="${logo}" alt="Logo Atacadão">
              </div>
              <div class="footer-content-center">
                <p>© ${year} - Todos os direitos reservados</p>
              </div>
              <div class="footer-content-right">
                ${dataPrint}
              </div>
            </div>
          </div>
        </footer>
      </html>
    `);

    newWindow.document.close();

    newWindow.onload = () => {
      newWindow.focus();
      newWindow.print();
      newWindow.close();
    };
  };

  return (
    loaded &&
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      }}>
      <h5 style={{marginRight: '1rem'}}>Gerar Relatório</h5>
      <button 
        style={{ width: '30%' }}
        onClick={handlePrint}
      >
        <AiFillPrinter />
      </button>
    </div>
  );
};

export default GenerateReport;

// ${tableRanking.slice(3).map((item, index) =>
//   "<tr key="+item.registration+"-"+(index + 4)+">"+
//     "<td>"+(index + 4)+" °</td>"+
//     "<td>"+item.registration+"</td>"+
//     "<td>"+item.name+"</td>"+
//     "<td>"+item.qty+"</td>"+
//     "<td>R$ "+item.total+"</td>"+
//   "</tr>"
// )}