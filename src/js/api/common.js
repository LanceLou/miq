import request from 'superagent';
import { ToastMessage } from 'action/global';

import Tool from '../util/tool';


const mainUrl = 'http://miq.lancelou.com';

const addCsrfToken = (params) => {
  const tokenKV = { _csrf: Tool.getCookie('csrfToken') };
  return params ? params.assign(params, tokenKV) : tokenKV;
};

const Fetch = {
  get: url => params => new Promise((resolve, reject) => {
    request
      .get(`${mainUrl}${url}`)
      .query(params)
      .end((err, res) => {
        // 部署全局统一提示
        if (err) {
          console.log(err);
          ToastMessage(err.message, res);
          reject(err);
        } else {
          resolve(res);
        }
      });
  }),
  post: url => params => new Promise((resolve, reject) => {
    // 单纯post方式 url-encode
    const reqParams = addCsrfToken(params);
    request
      .post(`${mainUrl}${url}`)
      .send(reqParams)
      .end((err, res) => {
        // 部署全局统一提示
        if (err) {
          console.log(err);
          ToastMessage(err.message, res);
          reject(err);
        } else {
          resolve(res);
        }
      });
  }),
  postByJson: url => params => new Promise((resolve, reject) => {
    // json 版 post application/json
    const reqParams = addCsrfToken(params);
    request
      .post(`${mainUrl}${url}`)
      .set('Content-Type', 'application/json')
      .send(reqParams)
      .end((err, res) => {
        // 部署全局统一提示
        if (err) {
          console.log(err);
          ToastMessage(err.message, res);
          reject(err);
        } else {
          resolve(res);
        }
      });
  }),
  postByFormData: url => params => new Promise((resolve, reject) => {
    // formDate 文件上传相关
    const reqParams = addCsrfToken(params);
    request
      .post(`${mainUrl}${url}`)
      .set('Content-Type', 'multipart/form-data')
      .send(reqParams)
      .end((err, res) => {
        // 部署全局统一提示
        if (err) {
          console.log(err);
          ToastMessage(err.message, res);
          reject(err);
        } else {
          resolve(res);
        }
      });
  }),
  delete: url => params => new Promise((resolve, reject) => {
    // delete: 从服务器删除资源
    const reqParams = addCsrfToken(params);
    request
      .delete(`${mainUrl}${url}`)
      .send(reqParams)
      .end((err, res) => {
        // 部署全局统一提示
        if (err) {
          console.log(err);
          ToastMessage(err.message, res);
          reject(err);
        } else {
          resolve(res);
        }
      });
  }),
  patch: url => params => new Promise((resolve, reject) => {
    // patch: 从服务器更新资源，提供部分字段
    const reqParams = addCsrfToken(params);
    request
      .patch(`${mainUrl}${url}`)
      .send(reqParams)
      .end((err, res) => {
        // 部署全局统一提示
        if (err) {
          console.log(err);
          ToastMessage(err.message, res);
          reject(err);
        } else {
          resolve(res);
        }
      });
  }),
};
export default Fetch;
