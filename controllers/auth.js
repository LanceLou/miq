/**
 * -------------------------------------------------------------
 * auth.js
 * 用户认证模块
 * 负责未登录重定向，第三方auth callback处理，以及第三方登录token认证，登录session设置
 * 第三方auth callback path
 *  Github: oauth2callbackgh
 *  Google: oauth2callback
 *
 *
 * 后期优化：引入JWT / koa-password?
 * -------------------------------------------------------------
 */
const config = require('../config');
const GoogleAuth = require('google-auth-library');
const request = require('superagent');
const userModel = require('../models/user');

const gauth = new GoogleAuth();
const ggclient = new gauth.OAuth2(config.GGCLIENT_ID, '', '');
const parseQueryStr = (queryStr) => {
  const queryData = {};
  const queryStrList = queryStr.split('&');
  queryStrList.forEach((item) => {
    const itemList = item.split('=');
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  });
  return queryData;
};
const getBody = ctx => new Promise((resolve) => {
  let postdata = '';
  ctx.req.addListener('data', (data) => {
    postdata += data;
  });
  ctx.req.addListener('end', () => {
    const parseData = parseQueryStr(postdata);
    resolve(parseData);
  });
});
const verifyIdGoogleTokenPromise = token => new Promise((resolve) => {
  ggclient.verifyIdToken(
    token,
    config.GGCLIENT_ID,
    (e, login) => {
      console.log(e);
      console.log(login);
      const payload = login.getPayload();
      if (!payload || !payload.email) {
        resolve(null);
      } else {
        resolve(payload);
      }
    });
});
const getUserGithubInfo = token => new Promise((resolve, reject) => {
  request
  .get('https://api.github.com/user')
  .query({
    access_token: token,
  }) // query string
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.body);
    }
  });
});
const getGithubToken = code => new Promise((resolve, reject) => {
  request
  .post('https://github.com/login/oauth/access_token')
  .query({
    code,
    client_id: config.GHCLIENT_ID,
    client_secret: config.GHCLIENT_SECRET_ID,
  }) // query string
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.body);
    }
  });
});
async function createUser(userInfo, type) {
  const user = await userModel.insert({
    name: userInfo.name,
    email: userInfo.email,
    logoUrl: userInfo.picture || userInfo.avatar_url,
    thirdpartId: type,
    status: 1,
    thirdpartUniq: type === 0 ? userInfo.email : userInfo.html_url,
  });
  return user;
}
async function thirdPartLoginCb(ctx, bodyData) {
  console.log(ctx.path);
  try {
    if (ctx.path.indexOf('/oauth2callbackgh') === 0) {
      console.log('--------------github auth--------------');
      // github auth
      const token = await getGithubToken(ctx.request.url.split('=')[1]);
      const basicInfo = await getUserGithubInfo(token.access_token);
      if (basicInfo) {
        // DB查询用户或存储
        const user = await userModel.getBy('thirdpartUniq', basicInfo.html_url);
        if (user.length) {
          ctx.session.userId = user[0].id;
        } else {
          user.userId = await createUser(basicInfo, 1);
          ctx.session.userId = user.userId;
        }
        // 重定向至登录
        ctx.throw(302, 'Github auth success, redirect to index');
      } else {
        // 否则认证失败
        ctx.throw(401, 'github auth failed');
      }
    } else if (ctx.path.indexOf('/oauth2callback') === 0) {
      console.log('--------------google auth--------------');
      // google auth
      const userInfo = await verifyIdGoogleTokenPromise(bodyData.idtoken);
      console.log(userInfo);
      if (userInfo && userInfo.aud) {
        // DB查询新用户或存储
        let user = await userModel.getBy('thirdpartUniq', userInfo.email);
        if (user) {
          ctx.session.userId = user.id;
        } else {
          user = await createUser(userInfo, 0);
          console.log(user.id);
          ctx.session.userId = user.id;
        }
        // 重定向至主页
        ctx.throw(302, 'Google auth success, redirect to index');
      } else {
        ctx.throw(401, 'google auth failed');
      }
    }
  } catch (e) { // 与第三方服务器进行校验时失败(物理通信相关)
    ctx.throw(401, e);
  }
}

/**
 * 已存库用户status字段check，监控admin锁定用户
 *
 * @param {any} userId 用户ID
 */
async function userStatusCheck(userId) {
  const user = await userModel.get(userId);
  if (user.status === 2) {
    return false;
  }
  return true;
}
async function auth(ctx, next) {
  const session = ctx.session;
  console.log(session);
  if (session.userId) {
    // 用户已登录, 检查用户是否被锁定

    await next();
    // if (userStatusCheck()) {
    //   await next();
    // } else {
    //   ctx.throw(401, 'user locked');
    // }
  } else if (ctx.path.indexOf('/oauth2callback') === 0) {
    const bodyData = await getBody(ctx);
    await thirdPartLoginCb(ctx, bodyData);
  } else {
    // 其他，统一重定向登录
    ctx.redirect('login.html');
  }
}

module.exports = {
  auth,
};
