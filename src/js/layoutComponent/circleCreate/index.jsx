import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import CardHeader from 'Components/cardHeader';
import ImageUpload from 'Components/upload/imageUpload';
import Style from './index.scss';

const cx = classNames.bind(Style);

/**
 * 添加圈子组件
 * 后期修改圈子组件通过高阶组件包裹此组件
 * @class CircleCreate
 * @extends {React.Component}
 */
class CircleCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: {},
      values: {
        name: props.circle && props.circle.name,
        intro: props.circle && props.circle.intro,
        logUrl: props.circle && props.circle.logUrl,
        id: props.circle && props.circle.id,
      },
    };
    this.fieldMap = {
      name: '圈子名称',
      intro: '圈子介绍',
      logUrl: '上传图片',
    };
  }
  handlerChange = (changeObj) => {
    const values = this.state.values;
    Object.assign(values, changeObj);
    this.setState({
      values,
    });
    this.validate(changeObj);
  }
  handlerImageUploadedError = () => {
    const warning = this.state.warning;
    warning.logUrl = '上传失败';
    this.setState({
      warning,
    });
  }
  handlerImageUploaded = (url) => {
    const values = this.state.values;
    if (url === '') { // 被删除
      values.logUrl = '';
    } else { // 上传成功
      values.logUrl = url;
    }
    this.setState({
      values,
    });
  }
  /**
   * TODO:
   * submit the circle create request
   */
  handlerSubmit = () => {
    const values = this.state.values;
    let isEdit = true;
    if (!values.id) {
      delete values.id;
      isEdit = false;
    }
    const fields = Object.entries(this.state.values).map(entry => ({ [entry[0]]: entry[1] }));
    if (fields.every(this.validate)) {
      if (isEdit) {
        console.log('edit lalala');
      } else {
        console.log('add lalala');
      }
    }
  }
  handlerCancel = () => {

  }
  validate = (field) => {
    let isOk = false;
    const warning = this.state.warning;
    const fieldName = Object.keys(field)[0];
    const value = field[fieldName];
    if (fieldName === 'logUrl') {
      return true;
    }
    if (!value || value.trim().length === 0) {
      warning[fieldName] = `${this.fieldMap[fieldName]}不能为空`;
    } else {
      warning[fieldName] = '';
      isOk = true;
    }
    this.setState({
      warning,
    });
    return isOk;
  }
  render() {
    return (<div className="element-card">
      <CardHeader title="新建圈子" />
      <div className={cx({ 'element-cardContent': true, formContent: true })}>
        <span className={Style.formItem}>
          <label htmlFor="name" className="form-label">圈子名称:</label>
          <input type="text" name="name" className={Style.input_text} onChange={ev => this.handlerChange({ name: ev.target.value })} />
          <em>{this.state.warning.name}</em>
        </span>
        <span className={Style.formItem}>
          <label htmlFor="intro" className="form-label">圈子介绍:</label>
          <textarea name="intro" className={Style.input_text} onChange={ev => this.handlerChange({ intro: ev.target.value })} />
          <em>{this.state.warning.intro}</em>
        </span>
        <span className={Style.formItem}>
          <label htmlFor="intro" className="form-label">上传图片:</label>
          <ImageUpload
            handlerImageUploaded={this.handlerImageUploaded}
            handlerImageUploadedError={this.handlerImageUploadedError}
          />
          <em>{this.state.warning.logUrl}</em>
        </span>
        <span className={Style.formItem}>
          <a className="btn" onClick={this.handlerSubmit} role="button" tabIndex="-1">提交</a>
          <NavLink to="/" className="btn">取消</NavLink>
          {/* <a className="btn" onClick={this.handlerCancel} role="button" tabIndex="-1">取消</a> */}
        </span>
      </div>
    </div>);
  }
}

CircleCreate.propTypes = {
  circle: PropTypes.shape({
    name: PropTypes.string,
    intro: PropTypes.string,
    logUrl: PropTypes.string,
    id: PropTypes.number,
  }),
};


export default CircleCreate;
