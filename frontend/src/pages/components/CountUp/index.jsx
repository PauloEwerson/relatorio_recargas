import React, { useContext } from 'react';
import './styles.css';
import { HomeContext } from '../../../context/HomeContext';
import moment from 'moment';

const CountUp = () => {

  const {
    data,
    meta,
  } = useContext(HomeContext);

  // Step 0: Dias do mês
  const today = moment().startOf('day');
  const firstDayOfMonth = moment().startOf('month');
  const numberOfDays = today.diff(firstDayOfMonth, 'days') + 1;

  // Step 1: calcula a média de vendas por dia
  const totalSales = data.reduce((acc, transaction) => {
    if (transaction.estado === 'Efetuada PDV ') {
      acc += Number(transaction.valor);
      return acc;
    }
    return acc;
  }, 0);

  // Step 2: calcula as vendas do dia
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

  // Stet 3 - Calcula a média de vendas por dia
  const averageSalesPerDay = totalSales / numberOfDays;

  // Step 4: calcula quanto falta vender para alcançar a meta
  const remainingSales = meta - totalSales;

  // Step 5: calcula a previsão para bater a meta (data)
  const todayDate = new Date();
  const daysRemaining = remainingSales / averageSalesPerDay;
  const projectedDate = new Date();
  projectedDate.setDate(todayDate.getDate() + daysRemaining);

  // Step 6: calcular a porcentagem alcançada
  const percentageAchieved = ((totalSales / meta) * 100).toFixed(2);

  // Step 7: Calcula a saúde da meta:
  /* 
    red: Abaixo da média, difício de alcançar a meta até o final do mês;
    blue: próximo da média, mas ainda não alcançará a meta até o final do mês;
    green: na média ou acima da média,alcançará a meta até o final do mês;
  */
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
  return (
    <div id="countdown-wrap">
      <span className={`progress-bar-${colorClass}`}></span>
      <div id="goal" className="no-print">Meta R${(meta).toLocaleString()}</div>
      <div id="glass" className="no-print">
        <div
          id="progress"
          className={`progress-bar-${colorClass}`}
          style={{ width: `${percentageAchieved}%` }}
        >
          {`${
            percentageAchieved === "NaN"
              ? "0,00"
              : percentageAchieved
            }%`}
        </div>
      </div>
      <div className="goal-stat">
        <span className="goal-number">{`R$ ${(
          dailyTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        )}`}</span>
        <span className="goal-label">Meta / dia</span>
      </div>
      <div className="goal-stat">
        <span className="goal-number">{`R$ ${(
          todaySales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        )}`}</span>
        <span className="goal-label">Venda / dia</span>
      </div>
      <div className="goal-stat">
        <span className="goal-number">{`R$ ${(
          averageSalesPerDay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        )}`}</span>
        <span className="goal-label">Média / mês</span>
      </div>
      <div className="goal-stat">
        <span className="goal-number">
          <div id="countdown"></div>
        </span>
        <span className="goal-number">{`R$ ${(
          remainingSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        )}`}</span>
        <span className="goal-label">Falta</span>
      </div>
      <div className="goal-stat">
        <span className="goal-number">{
        projectedDate.toLocaleDateString() === "Invalid Date"
              ? "Sem projeção"
              : projectedDate.toLocaleDateString()
        }</span>
        <span className="goal-label">Projeção</span>
      </div>
    </div>
  );
};

export default CountUp;