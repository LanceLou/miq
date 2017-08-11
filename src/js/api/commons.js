import request from 'superagent';

import Tool from '../util/tool';

const mainUrl = process.env.NODE_ENV === 'production' ? 'http://miq.lancelou.com' : 'http://localhost:8080';

const addCsrfToken = (params) => {
  const tokenKV = { _csrf: Tool.getCookie('csrfToken') };
  return params ? Object.assign(params, tokenKV) : tokenKV;
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
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  }),
  put: url => params => new Promise((resolve, reject) => {
    // put更新远程资源，带对象全部字段
    const reqParams = addCsrfToken(params);
    request
      .put(`${mainUrl}${url}`)
      .send(reqParams)
      .end((err, res) => {
        // 部署全局统一提示
        if (err) {
          console.log(err);
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
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  }),
  postByFormData: url => params => new Promise((resolve, reject) => {
    // formDate 文件上传相关
    // const reqParams = addCsrfToken(params);
    request
      .post(url)
      .set('Content-Type', 'multipart/form-data')
      .send(params)
      .end((err, res) => {
        // 部署全局统一提示
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res.body);
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
          reject(err);
        } else {
          resolve(res.body);
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
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  }),
};

export default Fetch;
