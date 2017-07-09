import React from 'react';
import Style from './index.scss';

const Header = (props) => {
  console.log(props);
  return (<header className={Style.header}>
    <span className={Style.logo}><a href="miq.lancelou.com">miq</a></span>
  </header>);
};

export default Header;
