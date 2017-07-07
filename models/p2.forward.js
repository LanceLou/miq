// 二期数据model规划

// 1： 数据可视化后报表(admin) eg:
// 根据圈子id找到所有当前在圈子用户(status=1)
// 根据圈子id获取所有只要有加过圈子的用户(不判断status)

/*-----------------
static async getAllUserInCircle(circleId) {
  const sql = 'Select * From user_circle where circle = ? and status = 1';
  const [users] = await global.db.query(sql, [circleId]);
  return users;
}

static async getAllHistoryUsersInCircle(circleId) {
  const sql = 'Select * From user_circle where circle = ?';
  const [users] = await global.db.query(sql, [circleId]);
  return users;
}
-----------------*/

