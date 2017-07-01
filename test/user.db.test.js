require('should');
const userModel = require('../models/user');
const { mysqlConnectionInitializeForTest } = require('../models/connectionPool');

const it = global.it;
const testAddUser = () => {
  it('insert user', async () => {
    await mysqlConnectionInitializeForTest();
    const result = await userModel.insert({ name: 'lance',
      thirdpartId: 0,
      logoUrl: 'https://avatars3.githubusercontent.com/u/15168516?v=3&u=45b22b3ad58b6d2e8b84ee777c34dfcf80759fd2&s=400',
      email: '12353261@gmail.com',
      status: 1 });
    result.should.be.instanceof(Number);
  });
};

const testFindUserById = () => {
  it('get user by id', async () => {
    await mysqlConnectionInitializeForTest();
    const result = await userModel.get(4);
    result.should.be.instanceof(Object).and.have.property('name', 'lance');
  });
};

const testGetUserByField = () => {
  it('get users by described fields', async () => {
    await mysqlConnectionInitializeForTest();
    const result = await userModel.getBy('email', '12353261@gmail.com');
    result.should.be.instanceof(Array).and.have.lengthOf(1);
  });
};
const testUpdateUser = () => {
  it('update user by given fileds and values', async () => {
    await mysqlConnectionInitializeForTest();
    userModel.update(4, { name: 'lancelou' });
  });
};
const initTest = () => {
  // testAddUser();
  testFindUserById();
  testGetUserByField();
  testUpdateUser();
};
initTest();
