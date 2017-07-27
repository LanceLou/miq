import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGlobalNavCollapse } from 'Reducers';
import { changeNavCollapse } from 'Actions/global';
import Style from './index.scss';

const Nav = props => (<div className={Style['nav-container']}>
  <ul>
    <NavLink to={`/circle/${'102832'}`}><li className="text-oneline_omit">圈子1</li></NavLink>
    <NavLink to={`/circle/${'128029'}`}><li>圈子2</li></NavLink>
    <NavLink to={`/circle/${'209033'}`}><li>圈子3</li></NavLink>
  </ul>
  <i className={Style['nav-collapseBtn']} onClick={() => props.changeNavCollapse(!props.navCollapse)} role="button" tabIndex="-1" />
</div>);

Nav.propTypes = {
  navCollapse: PropTypes.bool.isRequired,
  changeNavCollapse: PropTypes.func.isRequired,
};

const mapStateToNavProps = state => ({ navCollapse: getGlobalNavCollapse(state) });

const Navexp = connect(
  mapStateToNavProps,
  { changeNavCollapse },
)(Nav);

export default Navexp;
