require('should');
const topiceModel = require('../models/topic');
const { mysqlConnectionInitializeForTest } = require('../models/connectionPool');

const it = global.it;

// 测试相关参数
const modelName = 'Topic';
const Model = topiceModel;
const getByParam = {
  fieldNames: ['creator', 'circle'],
  values: [11, 7],
};
const findById = 1;
const updateParam = {
  id: 1,
  kv: {
    isTop: 0,
  },
};

const testAdd = () => {
  it(`insert ${modelName}`, async () => {
    await mysqlConnectionInitializeForTest();
    const result = await Model.insert({
      creator: 11,
      circle: 7,
      content: '内容',
      foreignLink: 'www.google.com',
      createTime: new Date(),
    });
    result.should.be.instanceof(Number);
  });
};

const testFindById = () => {
  it(`get ${modelName} by id`, async () => {
    await mysqlConnectionInitializeForTest();
    const result = await Model.get(findById);
    result.should.be.instanceof(Object).and.have.property('content', '啦啦啦，这是相关主题/问题的内容哈');
  });
};

const testFindByField = () => {
  it(`get ${modelName} by described fields`, async () => {
    await mysqlConnectionInitializeForTest();
    const result = await Model.getBy(getByParam.fieldNames, getByParam.values);
    result.should.be.instanceof(Array).and.have.lengthOf(1);
  });
};
const testUpdate = () => {
  it(`update ${modelName} by given fileds and values`, async () => {
    await mysqlConnectionInitializeForTest();
    Model.update(updateParam.id, updateParam.kv);
  });
};
const testRemove = () => {
  it(`remove ${modelName} by given id`, async () => {
    await mysqlConnectionInitializeForTest();
    Model.removeTopic(1);
  });
};
const testGetUserAll = () => {
  it(`get all ${modelName} by gived userId`, async () => {
    await mysqlConnectionInitializeForTest();
    const result = await Model.getAllTopicByUserId(11);
    result.should.be.instanceof(Array).and.have.lengthOf(1);
  });
};
const initTest = () => {
  // testAdd();
  testFindById();
  testFindByField();
  testUpdate();
  testRemove();
  testGetUserAll();
};
// initTest();
