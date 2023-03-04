import { createBrowserHistory } from 'history';
import './sidebar.css';
import logo from '../../../helpers/imgs/logo-v-cor-borda.png';
import { RxDashboard } from 'react-icons/rx';
import { GiChampions } from 'react-icons/gi';
import { AiOutlineUserAdd } from 'react-icons/ai';

const Menu = ({ selectedOption, setSelectedOption }) => {
  const history = createBrowserHistory();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    let route = '';
    switch (option) {
      case 'Dashboard':
        // route = '/';
        route = '#';
        break;
      case 'Cadastrar':
        // route = '/operadores';
        route = '#';
        break;
      case 'Ranking':
        // route = '/relatorio';
        route = '#';
        break;
      default:
        break;
    }
    history.push(route);
  };

  const options = [
    {
      name: 'Dashboard',
      component: <RxDashboard />
    },
    {
      name: 'Ranking',
      component: <GiChampions />
    },
    {
      name: 'Cadastrar',
      component: <AiOutlineUserAdd />
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo Atacadão" />
      </div>
      <ul className="list-unstyled components">
        {options.map(option => (
          <li className="active" key={option.name}>
            <div className="menu-content"
            >
              <span className={`${selectedOption === option.name
                ? 'text-warning'
                : ''
                }`}
              >
                {option.component}
              </span>
              <button
                className={`nav-link ${selectedOption === option.name
                  ? 'text-warning'
                  : ''
                  }`}
                onClick={() => handleOptionClick(option.name)}
              >
                {option.name}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
