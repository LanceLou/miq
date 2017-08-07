// 文件上传至 -> 图片上传组件
import React from 'react';
import PropTypes from 'prop-types';
import request from 'superagent';
import classNames from 'classnames/bind';
import Style from './index.scss';

const cx = classNames.bind(Style);

const CLOUDINARY_UPLOAD_PRESET = 'oyow3bfh';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dzsbsnlxs/upload';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      imgUrl: props.imgUrl,
    };
  }
  handlerImgeUpload = () => {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', this.fileuploader.files[0]);
    upload.end((err, response) => {
      if (err || !response) {
        // 上传出错
        if (this.props.handlerImageUploadedError) {
          this.props.handlerImageUploadedError();
        }
      } else if (response.body.secure_url !== '') {
        const url = response.body.secure_url;
        this.setState({
          imgUrl: url,
        });
        this.props.handlerImageUploaded(url);
      }
      this.setState({
        uploading: false,
      });
    });
    this.setState({
      uploading: true,
    });
  }
  handlerClick = () => {
    if (this.state.uploading) {
      return;
    }
    if (!this.state.imgUrl) {
      this.fileuploader.click();
    } else {
      this.setState({
        imgUrl: '',
      });
      // 图片被删除，通知父组件
      this.props.handlerImageUploaded('');
    }
  }
  render() {
    const defaultUrl = 'http://og4j2atko.bkt.clouddn.com/o_1b1br1hkdom3f6c1gihjs51ouc7.jpg';
    const anchorStyle = cx({
      'upload-btn': true,
      'upload-btn-ing': this.state.uploading,
    });
    return (<div className={Style['element-imgUploader']} style={{ backgroundImage: `url(${this.state.imgUrl || defaultUrl})` }}>
      <a className={anchorStyle} onClick={this.handlerClick} role="button" tabIndex="-1">
        {this.state.imgUrl ? '删除' : '点击上传'}
      </a>
      <input type="file" ref={(me) => { this.fileuploader = me; }} onChange={this.handlerImgeUpload} accept=".jpg, .jpeg, .png" />
    </div>);
  }
}

ImageUpload.propTypes = {
  handlerImageUploaded: PropTypes.func.isRequired,
  handlerImageUploadedError: PropTypes.func,
  imgUrl: PropTypes.string,
};

export default ImageUpload;
