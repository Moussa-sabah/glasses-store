
import './Header.css'
import HeaderLeft from './headerLeft';
import HeaderNavbar from './headerNavbar';
import HeaderRight from './headerRight';


const Header = () => {




  return (
    <div className="header">


      <HeaderLeft />
      <HeaderNavbar/>
      <HeaderRight/>

    </div>

  );
}

export default Header;