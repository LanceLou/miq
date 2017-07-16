import React from 'react';
import Search from 'Components/search';
import Style from './index.scss';

const Header = (props) => {
  console.log(props);
  return (<header className={Style.header}>
    <span className={Style.logo}><a href="miq.lancelou.com">miq</a></span>
    <div className={Style.headerComponents}>
      <Search />
    </div>
  </header>);
};

export default Header;
