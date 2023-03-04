import React, { createContext, useState, useContext } from 'react';
import api from '../api'
import { MessageContext } from './Message';

export const OperatorsContext = createContext();

export const OperatorsProvider = (props) => {

  const [dataOperators, setDataOperators] = useState([]);
  const [toggle, setToggle] = useState(true); // Alterna entre o modo de Cadastro e Edição
  const [updateName, setUpdateName] = useState('');
  const [updateMatricula, setUpdateMatricula] = useState('');
  const [updateId, setUpdateId] = useState('');
  // Ordenamento dos operadores por Nome e Matrícula
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  // Controle da paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    setMessage,
  } = useContext(MessageContext);

  // Busca os operadores cadastrados no banco de dados e armazena no estado
  const fetchOperators = async () => {
    const response = await api('get', '/operadores');
    setDataOperators(response.data.infoCol);
  };

  // Adiciona um novo operador no banco de dados e atualiza o estado 
  const handleSubmitOperators = async (e) => {
    const {name, registration} = e;
    try {
      const response = await api('post', '/operadores', { name, registration });
      setDataOperators([...dataOperators, response.data.infoCol])
      if (response.data.message) {
        setMessage({ message: response.data.message, status: 'success' });
      }
    } catch (error) {
      if (error.response.data.error) {
        setMessage({ message: error.response.data.error, status: 'error' });
      }
      console.error(error);
    }
  };

  // Altera o estado para o modo de edição
  const handleUpdate = async (id) => {
    const operador = dataOperators.find((operador) => operador.id === id);
    setToggle(!toggle); // altera para o modo de edição
    setUpdateName(operador.name);
    setUpdateMatricula(operador.registration);
    setUpdateId(operador.id);
  };

  const handleUpdateBack = async () => {
    setToggle(!toggle); // altera para o modo de edição
  };

  // Atualiza um operador no banco de dados e atualiza o estado
  const handleUpdateOperador = async (e) => {
    e.preventDefault();
    try {
      const response = await api('put', `/operadores/${updateId}`, {
        name: updateName,
        registration: updateMatricula
      });
      if (response.data.message) {
        setMessage({ message: response.data.message, status: 'success' });
      }

      setDataOperators(dataOperators.map(
        (operador) => operador.id === updateId ? response.data.infoCol : operador
      ));

      setToggle(!toggle); // altera para o modo de edição
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        setMessage({ message: error.response.data.error, status: 'error' });
      }
    }
  }

  // Deleta um operador do banco de dados e atualiza o estado
  const handleDelete = async (id) => {
    try {
      const response = await api('delete', `/operadores/${id}`);
      setDataOperators(dataOperators.filter((operador) => operador.id !== id));
      setMessage({ message: response.data.message, status: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  // Ordenamento dos operadores por Nome e Matrícula
  const handleSortByName = () => {
    setSortBy("name");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortByRegistration = () => {
    setSortBy("registration");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  /* ORDENAÇÃO */
  // Filtra os operadores e ordena de acordo com o estado sortBy e sortOrder
  let operatorsToShow = [...dataOperators].sort((a, b) => {
    if (sortBy === "name") {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else {
      if (sortOrder === "asc") {
        return a.registration - b.registration;
      } else {
        return b.registration - a.registration;
      }
    }
  });

  /* PAGINAÇÃO */
  // Usa o estado currentPage para determinar quais operadores devem ser exibidos na tabela:
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  operatorsToShow = operatorsToShow.slice(startIndex, endIndex);

  return (
    <OperatorsContext.Provider value={{
      fetchOperators,
      toggle,
      handleSubmitOperators,
      updateName,
      setUpdateName,
      updateMatricula,
      setUpdateMatricula,
      handleUpdateOperador,
      handleSortByName,
      handleSortByRegistration,
      operatorsToShow,
      handleUpdate,
      handleDelete,
      setCurrentPage,
      currentPage,
      totalPages,
      setMessage,
      dataOperators,
      handleUpdateBack,
      setTotalPages,
    }}>
      {props.children}
    </OperatorsContext.Provider>
  );
};
