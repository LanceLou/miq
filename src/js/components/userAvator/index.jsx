import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GApi from 'Util/platform';
import { getGlobalUserDetail } from 'Reducers';
import Style from './index.scss';

const UserAvatorComponent = (props) => {
  const logoUrl = props.user && props.user.logoUrl;
  const thirdpartUniq = props.user.thirdpartUniq;
  // 登录处理
  const logOut = () => {
    if (thirdpartUniq.indexOf('gmail.com') > 0) {
      const auth2 = GApi.auth2.getAuthInstance();
      auth2.signOut();
    }
    window.location = '/logout';
  };
  return (<div className={Style['m-userAvator']}>
    <span className={Style['m-userAvator_icon']} style={logoUrl && { backgroundImage: `url(${logoUrl})` }} />
    <div className={Style['m-userNavList']}>
      <ul>
        <li><i className="background_center_norepeat" /><Link to="/topics">我的主题</Link></li>
        <li><i className="background_center_norepeat" /><Link to="/collection">我的收藏</Link></li>
        <li><i className="background_center_norepeat" /><Link to="/data">我的数据</Link></li>
        <li><i className="background_center_norepeat" /><a onClick={logOut} role="button" tabIndex="-1">退出登录</a></li>
      </ul>
    </div>
  </div>);
};

UserAvatorComponent.propTypes = {
  user: PropTypes.shape({
    logoUrl: PropTypes.string,
    thirdpartUniq: PropTypes.string,
  }).isRequired,
};

// 与运算与或运算其实不是求true or false，只是去前or后值，当然具体取那个值依情况而定。

const mapStateToUserAvatorProps = state => ({
  user: getGlobalUserDetail(state),
});
const UserAvator = connect(mapStateToUserAvatorProps)(UserAvatorComponent);

export default UserAvator;
