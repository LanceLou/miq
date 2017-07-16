// /**
//  * 数据mock函数，进行相应的开发时请求处理，类似于mock server
//  *
//  */
// const Rest = require('connect-rest'); // nodejs restful风格API提供

// const mockDataDir = `${process.cwd()}/test/frontEnd`;

// const options = {
//   context: '/xhr',
//   logger: { file: 'mochaTest.log', level: 'debug' },
// };
// const rest = Rest.create(options);

// // adds connect-rest middleware to connect
// // connectApp.use(rest.processRequest());

// rest.get('*', (request, content, callback) => {

//   // return { name: 'lance' };
//   callback(null, { name: 'Lancelou' });
//   // console.log('/xhr/search');
// });

// module.exports = rest;

const mockDataDir = `${process.cwd()}/test/frontEnd`;
const fs = require('fs');

const mockMiddleware = (req, res, next) => {
  let url = req.url;
  url = url.split('?')[0]; // 取有效部分
  // 走API数据mock
  if (url.indexOf('xhr') >= 0) {
    const curPath = `${mockDataDir}${url}`;
    let body = '';
    let status = 404;
    fs.exists(curPath, (exists) => {
      if (exists) {
        body = fs.readFileSync(curPath, 'utf8');
        status = 200;
      } else {
        body = 'api handler no find';
      }
      res.writeHead(status, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json; charset=utf-8',
      });
      res.end(body);
    });
  } else { // 放行
    next();
  }
};

module.exports = mockMiddleware;
