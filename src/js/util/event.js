// https://github.com/asyncly/EventEmitter2
// 全局事件管理
import eventemitter2 from 'eventemitter2';

const EventEmitter2 = eventemitter2.EventEmitter2;

const server = new EventEmitter2();

export default server;

