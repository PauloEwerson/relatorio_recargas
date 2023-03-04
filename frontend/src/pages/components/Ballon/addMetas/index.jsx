import React, {useContext} from 'react'
import { HomeContext } from '../../../../context/HomeContext';
import './styles.css';

const AddMetas = () => {
  const { meta, updateMeta, handleUpdateMeta, handleSubmitHome } = useContext(HomeContext);

  return (
    <section className="metas-section">
      <div className="metas">
        <h5>Meta de vendas: {(meta).toLocaleString()}</h5>
        <input
          type="text"
          value={updateMeta}
          onInput={(event) => {
            const inputValue = event.target.value;
            if (!isNaN(inputValue)) {
              handleUpdateMeta(inputValue);
            }
          }}
        />
        <button
          disabled={!updateMeta}
          onClick={() => {
            handleSubmitHome();
            handleUpdateMeta("");
          }}
        >
          Atualizar Meta
        </button>
      </div>
    </section>
  );
};

export default AddMetas;
