require('should');
const circleModel = require('../models/circle');
const { mysqlConnectionInitializeForTest } = require('../models/connectionPool');

const it = global.it;

// 测试相关参数
const modelName = 'Circle';
const Model = circleModel;
const getByParam = {
  fieldNames: ['name', 'creator'],
  values: ['lance circle', 11],
};
const findById = 7;
const updateParam = {
  id: 7,
  kv: {
    status: 2,
  },
};

const testAdd = () => {
  it(`insert ${modelName}`, async () => {
    await mysqlConnectionInitializeForTest();
    const result = await Model.insert({
      name: 'lance circle',
      intro: 'bla bla',
      creator: 11,
      logUrl: 'https://avatars3.githubusercontent.com/u/15168516?v=3&u=45b22b3ad58b6d2e8b84ee777c34dfcf80759fd2&s=400',
      status: 1,
      createdAt: new Date(),
    });
    result.should.be.instanceof(Number);
  });
};

const testFindById = () => {
  it(`get ${modelName} by id`, async () => {
    await mysqlConnectionInitializeForTest();
    const result = await Model.get(findById);
    result.should.be.instanceof(Object).and.have.property('name', 'lance circle');
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

const testGetCircleMenbers = () => {
  it('getCircleMenbers', async () => {
    await mysqlConnectionInitializeForTest();
    const result = await Model.getCircleMenbers(7, 1, 10);
    console.log(result);
    result.should.be.instanceof(Array).and.have.lengthOf(10);
  });
};

const initTest = () => {
  // testAdd();
  // testFindById();
  // testFindByField();
  // testUpdate();
  testGetCircleMenbers();
};
initTest();

