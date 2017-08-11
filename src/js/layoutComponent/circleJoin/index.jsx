import React from 'react';
import classNames from 'classnames/bind';
import { searchCircle } from 'Api/search.api';
import Style from './index.scss';

const cx = classNames.bind(Style);

class CircleJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [],
      keyword: '',
    };
  }
  handlerSearchKWChange = (ev) => {
    this.setState({
      keyword: ev.target.value,
    });
  }
  handlerSearch = () => {
    const me = this;
    this.setState({
      resultList: [],
    });
    searchCircle({ kw: this.state.keyword }).then((resultList) => {
      me.setState({
        resultList,
      });
    });
  }
  render() {
    const circles = this.state.resultList;
    return (<div className={Style.circleJoin}>
      <div className={Style.search}>
        <input type="text" value={this.state.keyword} onChange={this.handlerSearchKWChange} placeholder="输入圈子或圈子创建人进行搜索" />
        <a className={cx({ btn: true, searchBtn: true })} onClick={this.handlerSearch} role="button" tabIndex="-1">Search</a>
      </div>
      <div className={Style.resultContainer}>
        <ul>
          {
            circles.map(circle => (
              <li key={circle.id}>
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
              </li>
            ))
          }
        </ul>
      </div>
    </div>);
  }
}

export default CircleJoin;

// {this.state.resultList.map(result => (
//             <li>
//               <span>{result.circleName}</span>
//               <span>{result.circleCreator}</span>
//               <span>{result.circleIntro}</span>
//             </li>
//           ))}
