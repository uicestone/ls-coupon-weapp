import store from "../store";
import * as api from "../common/vmeitime-http";

export const wechatLogin = () =>
  new Promise((resolve, reject) => {
    const provider = "weixin";
    uni.showLoading();
    uni.login({
      provider,
      success: loginRes => {
        console.log(loginRes);
        uni.getUserInfo({
          provider,
          lang: "zh_CN",
          success: async userData => {
            // console.log(userData);
            try {
              const res = await api.wechatLogin({ code: loginRes.code });
              let { userInfo } = userData;
              userInfo = Object.assign({}, userInfo, res.data);
              console.log(userInfo);
              handleLogin({ user: userInfo });
              resolve(userInfo);
            } catch (err) {
              uni.showToast({
                title: "登录失败",
                icon: "none"
              });
              reject(err);
            }
            uni.hideLoading();
          },
          fail(err) {
            uni.hideLoading();
            reject(err);
          }
        });
      },
      fail(err) {
        uni.hideLoading();
        reject(err);
      }
    });
  });

export const handleLogin = ({ user } = {}) => {
  try {
    store.state.auth.user = user;
    store.state.auth.showLogin = false;
    if (user.roles) {
      store.state.currentTab = "管理";
    }
  } catch (e) {
    console.error(e);
  }
};
