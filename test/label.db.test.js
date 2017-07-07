require('should');
const circleModel = require('../models/label');
const { mysqlConnectionInitializeForTest } = require('../models/connectionPool');

const it = global.it;

// 测试相关参数
const modelName = 'Label';
const Model = circleModel;
const getByParam = {
  fieldNames: ['name', 'circle'],
  values: ['基础学习', 7],
};
const findById = 1;
const updateParam = {
  id: 1,
  kv: {
    status: 2,
  },
};

const testAdd = () => {
  it(`insert ${modelName}`, async () => {
    await mysqlConnectionInitializeForTest();
    const result = await Model.insert({
      name: '基础学习',
      circle: 7,
    });
    result.should.be.instanceof(Number);
  });
};

const testFindById = () => {
  it(`get ${modelName} by id`, async () => {
    await mysqlConnectionInitializeForTest();
    const result = await Model.get(findById);
    result.should.be.instanceof(Object).and.have.property('name', '基础学习');
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
const initTest = () => {
  // testAdd();
  testFindById();
  testFindByField();
  testUpdate();
};
initTest();

