import React from 'react';
import PropTypes from 'prop-types';
import Style from './index.scss';

const CircleInfoItem = (props) => {
  const circle = props.circle;
  return (<li key={circle.id} onClick={props.handlerCircleItemClick} role="presentation">
    <span className={Style.logo} style={{ backgroundImage: `url(${circle.logUrl})` }} />
    <span className={Style.circleNameIntro}>
      <span className="text-oneline_omit">圈子名称: {circle.name}(Created by {circle.creatorName})</span>
      <span>圈子Intro: {circle.intro}</span>
    </span>
    <span className={Style.circleMenbers}>
      {
        circle.circleMenbers.map(menber => (
          <img src={menber.logUrl} title={menber.name} alt="menber logo" key={menber.id} />
        ))
      }
    </span>
  </li>);
};

CircleInfoItem.propTypes = {
  circle: PropTypes.shape({
    id: PropTypes.string,
    circleMenbers: PropTypes.array,
    circleNameIntro: PropTypes.string,
  }),
  handlerCircleItemClick: PropTypes.func,
};

export default CircleInfoItem;
