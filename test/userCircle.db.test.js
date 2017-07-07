require('should');
const userCircleModel = require('../models/userCircle');
const { mysqlConnectionInitializeForTest } = require('../models/connectionPool');

const it = global.it;

// 测试相关参数
const modelName = 'UerCircle';
const Model = userCircleModel;
const removeParams = {
  user: 13,
  circle: 7,
};

const testAdd = () => {
  it(`insert ${modelName}`, async () => {
    await mysqlConnectionInitializeForTest();
    const result = await Model.insert({
      user: 13,
      circle: 7,
    });
    result.should.be.instanceof(Number);
  });
};

const testFindUserAllCircleByUid = () => {
  it(`${modelName}: findUserAllCircleByUid`, async () => {
    await mysqlConnectionInitializeForTest();
    const result = await Model.findUserAllCircleByUid(13);
    result.should.be.instanceof(Array).and.have.lengthOf(1);
  });
};
const testUpdate = () => {
  it(`${modelName}: remove`, async () => {
    await mysqlConnectionInitializeForTest();
    Model.remove(removeParams.user, removeParams.circle);
  });
};
const initTest = () => {
  // testAdd();
  // testFindUserAllCircleByUid();
  // testUpdate();
};
initTest();

