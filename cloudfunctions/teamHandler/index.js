// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const teams = db.collection('teams');
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const { type, team_name, administrator } = event;
  if (type === 'add') {
    try {
      const res = await teams.add({
        data: {
          team_name, // 团队名称
          administrator, // 管理员
          openid: wxContext.OPENID,
          state: 1 // 状态： 0: 禁用 1: 启用
        }
      });
      return {
        code: 0,
        data: true
      };
    } catch (err) {
      console.log(222, err);
      return {
        code: 1,
        message: '创建失败'
      };
    }
  }
};
