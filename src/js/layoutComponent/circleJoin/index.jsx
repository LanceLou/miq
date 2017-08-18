import React from 'react';
import classNames from 'classnames/bind';
import Modal from 'Components/modal';
import { searchCircle } from 'Api/search.api';
import CircleInfoItem from './circleInfoItem';
import Style from './index.scss';

const cx = classNames.bind(Style);

class CircleJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [],
      keyword: '',
      modalVisible: false,
    };
  }
  handlerSearchKWChange = (ev) => {
    this.setState({
      keyword: ev.target.value,
    });
  }
  handlerSearch = () => {
    if (!this.state.keyword || this.state.keyword.trim().length === 0) {
      return;
    }
    const me = this;
    this.setState({
      resultList: [],
    });
    searchCircle({ keyword: this.state.keyword }).then((resultList) => {
      me.setState({
        resultList,
      });
    });
  }
  handlerCircleItemClick = (circle) => {
    console.log(circle);
    this.setState({
      modalVisible: true,
    });
  }
  render() {
    console.log('main - render');
    console.log(this.state.modalVisible);
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
              <CircleInfoItem
                key={circle.id}
                circle={circle}
                handlerCircleItemClick={() => this.handlerCircleItemClick(circle)}
              />
            ))
          }
        </ul>
      </div>
      <Modal visible={this.state.modalVisible}>
        <p>哈哈哈哈哈哈</p>
        <p>我就是modal的内容哈哈</p>
      </Modal>
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
