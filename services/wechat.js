import store from "../store";

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
          success: async infoRes => {
            console.log(infoRes);
            try {
              // const data = await wxmini_login_gql({
              //   code: loginRes.code,
              //   iv: infoRes.iv,
              //   encryptedData: infoRes.encryptedData
              // });

              // const { token, user, userData } = data;
              // const { session_key } = userData;

              // store.state.auth.session_key = session_key;
              // store.state.auth.token = token;
              // store.state.auth.user = user;

              // stroreUser({ user, token });
              const { userInfo } = infoRes;
              stroreUser({ user: userInfo });
              resolve(infoRes);
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

export const stroreUser = ({ user, token } = {}) => {
  try {
    uni.setStorage({
      key: "token",
      data: token
    });
    store.state.auth.user = user;
  } catch (e) {
    console.error(e);
  }
};
