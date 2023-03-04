import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MessageProvider } from './context/Message';
import { HomeProvider } from './context/HomeContext';
import { OperatorsProvider } from './context/OperatorsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <MessageProvider>
      <HomeProvider>
        <OperatorsProvider>
          <App />
        </OperatorsProvider>
      </HomeProvider>
    </MessageProvider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
