import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Style from './index.scss';

const CardHeader = props => (
  <div className={Style.cardHeader}>
    {props.targetLink ?
      <NavLink /> :
      <h5>{props.title}</h5>
    }
  </div>
);

CardHeader.propTypes = {
  targetLink: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default CardHeader;
