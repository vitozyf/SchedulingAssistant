// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();
const users = db.collection('users');
const wxContext = cloud.getWXContext();

async function getUserByOpenid(openid) {
  const user = await users
    .where({
      openid
    })
    .get();
  return user.data.length > 0 ? user.data[0] : null;
}
async function AddUser(userinfo) {
  const {
    avatarUrl,
    city,
    country,
    gender,
    language,
    nickName,
    province
  } = userinfo;
  const user = await users.add({
    data: {
      openid: wxContext.OPENID,
      unionid: wxContext.UNIONID,
      avatarUrl,
      city,
      country,
      gender,
      language,
      nickName,
      province
    }
  });
  if (user && user._id) {
    return {
      openid: wxContext.OPENID,
      unionid: wxContext.UNIONID,
      avatarUrl,
      city,
      country,
      gender,
      language,
      nickName,
      province
    };
  }
  return null;
}

exports.main = async (event, context) => {
  let res = {
    code: 0
  };
  switch (event.name) {
    case 'userIsInUserTable':
      res = await getUserByOpenid(wxContext.OPENID);
      break;
    case 'addUser':
      const user = await getUserByOpenid(wxContext.OPENID);
      if (user) {
        res = {
          code: 0,
          data: user
        };
      } else {
        const userRes = await AddUser(event.userInfo);
        res = {
          code: 0,
          data: userRes
        };
      }
      break;
    default:
      break;
  }
  return res;
};
