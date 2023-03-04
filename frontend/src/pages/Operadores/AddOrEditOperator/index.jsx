import React, { useContext, useState } from 'react';

import { OperatorsContext } from '../../../context/OperatorsContext';

const AddOrEditOperator = () => {

  const {
    toggle,
    handleUpdateBack,
    handleSubmitOperators,
    updateName,
    setUpdateName,
    updateMatricula,
    setUpdateMatricula,
    handleUpdateOperador,
  } = useContext(OperatorsContext);

  const [name, setName] = useState('');
  const [registration, setRegistration] = useState('');

  const handleForm = (e) => {
    e.preventDefault();
    handleSubmitOperators({name, registration})
    setName('')
    setRegistration('')
  }

  return (
    <div>
      {toggle ? (
        <div>
          <h5>Adicionar Operador</h5>
          <form onSubmit={handleForm}>
            <label>
              Nome:
            </label>
            <input
              type="text"
              placeholder="Colaborador(a)"
              value={name}
              onChange={(event) => setName(event.target.value)} />
            <label>
              Matrícula:
            </label>
            <input
              type="text"
              placeholder="Número"
              value={registration}
              onInput={(event) => {
                const inputValue = event.target.value;
                if (!isNaN(inputValue)) {
                  setRegistration(inputValue);
                }
              }}
            />
            {/* <input type="text" value={registration} onChange={(event) => setRegistration(event.target.value)} /> */}
            <button className="button-green" type="submit">Adicionar</button>
          </form>
        </div>
      ) : (
        <div>
          <h5>Editar Operador</h5>
          <form>
            <label>
              Nome:
            </label>
            <input type="text" placeholder="Nome" value={updateName} onChange={(event) => setUpdateName(event.target.value)} />
            <label>
              Matrícula:
            </label>
            <input
              type="text"
              placeholder="Matrícula"
              value={updateMatricula}
              onInput={(event) => {
                const inputValue = event.target.value;
                if (!isNaN(inputValue)) {
                  setUpdateMatricula(inputValue);
                }
              }}
            />
            {/* <input type="text" placeholder="Matrícula" value={updateMatricula} onChange={(event) => setUpdateMatricula(event.target.value)} /> */}
            <button className="button-green" onClick={handleUpdateOperador}>Atualizar</button>
            <button className="button-red" onClick={handleUpdateBack}>Voltar</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AddOrEditOperator;