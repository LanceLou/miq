import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getGlobalUserDetail } from 'Reducers';
import Style from './index.scss';

const UserAvatorComponent = (props) => {
  const logoUrl = props.user && props.user.logoUrl;
  return (<div className={Style['m-userAvator']}>
    <span className={Style['m-userAvator_icon']} style={logoUrl && { backgroundImage: `url(${logoUrl})` }} />
    <div className={Style['m-userNavList']}>
      <ul>
        <li><Link to="/topics">我的主题</Link></li>
        <li><Link to="/collection">我的收藏</Link></li>
        <li><Link to="/data">我的数据</Link></li>
        <li><Link to="/loginout">退出登录</Link></li>
      </ul>
    </div>
  </div>);
};

UserAvatorComponent.propTypes = {
  user: PropTypes.shape({
    logoUrl: PropTypes.string,
  }).isRequired,
};

// 与运算与或运算其实不是求true or false，只是去前or后值，当然具体取那个值依情况而定。

const mapStateToUserAvatorProps = state => ({
  user: getGlobalUserDetail(state),
});
const UserAvator = connect(mapStateToUserAvatorProps)(UserAvatorComponent);

export default UserAvator;
