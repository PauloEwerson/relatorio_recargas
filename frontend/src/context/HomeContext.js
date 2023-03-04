import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import api from '../api'
import { MessageContext } from './Message';

export const HomeContext = createContext();

export const HomeProvider = (props) => {
  const [file, setFile] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [updateMeta, setUpdateMeta] = useState('');

  // DATA_CONTEXT
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [meta, setMeta] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Mensagem de sucesso ou erro
  const {
    setMessage,
  } = useContext(MessageContext);

  // Carrega dados do backend
  const fetchData = async () => {
    setIsDataLoaded(false);
    const response = await api('get', '/relatorio');
    setData(response.data.infoCol);
    setUpdate(response.data.lastUpdate);
    setIsDataLoaded(true);
  };

  const fetchMeta = async () => {
    setIsDataLoaded(false);
    const response = await api('get', '/analytics/meta');
    setMeta(response.data.infoCol.meta);
    setIsDataLoaded(true);
  };

  // Envia arquivo CSV para o backend
  const handleFileChange = (e) => {
    setFile(e);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    setIsDataLoaded(false);
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:3001/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      // Atualiza data de última importação após upload
      .then((response) => {
        if (response.data.message) {
          setMessage({ message: response.data.message, status: 'success' });
        }
        response && fetchData('get', '/analytics/meta');
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.log(error)
        if (error.response.data.error) {
          setMessage({ message: error.response.data.error, status: 'error' });
        }
        setIsDataLoaded(true);
      });
  };

  const handleUpdateMeta = (e) => {
    setUpdateMeta(e);
  }

  const handleSubmitHome = async () => {
    setIsDataLoaded(false);
    try {
      const response = await api('put', '/analytics/meta', { updateMeta });
      fetchMeta();
      if (response.data.message) {
        setMessage({ message: response.data.message, status: 'success' });
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.error) {
        setMessage({ message: error.response.data.error, status: 'error' });
      }
    } finally {
      setIsDataLoaded(true);
    }
  }






  return (
    <HomeContext.Provider value={{
      data,
      fetchData,
      meta,
      fetchMeta,
      update,
      lastUpdate,
      setLastUpdate,
      isDataLoaded,
      setIsDataLoaded,
      updateMeta,
      handleUpdateMeta,
      handleUpload,
      handleFileChange,
      handleSubmitHome
    }}>
      {props.children}
    </HomeContext.Provider>
  );
};
