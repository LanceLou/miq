/**
 * 数据mock函数，进行相应的开发时请求处理
 */
const Rest = require('connect-rest'); // nodejs restful风格API提供

const options = {
  context: '/api',
  logger: { file: 'mochaTest.log', level: 'debug' },
  apiKeys: ['849b7648-14b8-4154-9ef2-8d1dc4c2b7e9'],
};
const rest = Rest.create(options);

// adds connect-rest middleware to connect
// connectApp.use(rest.processRequest());

// defines a few sample rest services
rest.get('/books/:title/:chapter', () => {});

rest.post({ path: '/make', version: '>=1.0.0' }, () => {});

rest.post(['/act', '/do'], () => {});

module.exports = rest;
