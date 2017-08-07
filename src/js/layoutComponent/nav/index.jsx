import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGlobalNavCollapse, getGlobalUserCircles } from 'Reducers';
import { changeNavCollapse } from 'Actions/global';
import Style from './index.scss';

const Nav = props => (<div className={Style['nav-container']}>
  <ul>
    { props.userCircles.map(circle => (
      <NavLink to={`/circle/${circle.id}`} key={circle.id}><li className="text-oneline_omit">{circle.name}</li></NavLink>
    ))}
    <li className={Style['nav-opts']}>
      <NavLink to="/create"><sapn>新建圈子</sapn></NavLink>
      <NavLink to="/join"><sapn>加入圈子</sapn></NavLink>
    </li>
  </ul>
  <i className={Style['nav-collapseBtn']} onClick={() => props.changeNavCollapse(!props.navCollapse)} role="button" tabIndex="-1" />
</div>);

Nav.propTypes = {
  navCollapse: PropTypes.bool.isRequired,
  changeNavCollapse: PropTypes.func.isRequired,
  userCircles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToNavProps = state => ({
  navCollapse: getGlobalNavCollapse(state),
  userCircles: getGlobalUserCircles(state),
});

const Navexp = connect(
  mapStateToNavProps,
  { changeNavCollapse },
)(Nav);

export default Navexp;
