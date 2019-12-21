//加载wx-server-sdk
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  env: 'pink-pc4mv'// 环境id
})
// 导出入口
exports.main = async function(event,context){
  // 获取上下文 包括 openid appid unionid
  const wxContext = cloud.getWXContext();
  // 连接数据库
  const db = cloud.database();
  // 判断用户是否存在
  const result = await db.collection('users').where({
    openid: wxContext.OPENID
  }).limit(1).get();
  // console.log(JSON.stringify(result))
  //{ "data": [], "errMsg": "collection.get:ok" }
  if (result.data.length == 0){ // 用户没有取到
    let params = {//用户信息
      ...event.user,// ... 对象解构
      openid: wxContext.OPENID
    }
    //用户不存在，需要插入新用户
    const userData = await db.collection('users').add({
      data: params
    });
    // 再次查询
    const result = await db.collection('users').where({
      openid: wxContext.OPENID
    }).limit(1).get();
    return {
      userId: result.data[0]._id
    }
  }else{// 用户存在
    return {
      userId: result.data[0]._id
    }
  }
}