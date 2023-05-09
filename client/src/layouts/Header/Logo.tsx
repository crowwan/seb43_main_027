import { Link } from 'react-router-dom';

import logo from '../../asset/Inddy.png';

const Logo = () => {
  return (
    <Link to='/'>
      <img src={logo} width={40} />
    </Link>
  );
};

export default Logo;
