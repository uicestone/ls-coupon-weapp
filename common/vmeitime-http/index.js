import http from "./interface";
import _ from "lodash";

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = data => {
  /* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
  //设置请求结束后拦截器

  return http.request({
    baseUrl: "https://ls-coupon.codeispoetry.tech/wp-json/v1",
    url: "ajax/echo/text?name=uni-app",
    dataType: "text",
    data
  });
};

http.interceptor.response = response => {
  console.log("response:", response);
  //判断返回状态 执行相应操作
  if (!response.statusCode || response.statusCode !== 200) {
    uni.showToast({
      icon: "none",
      title: _.get(response, "data.message") || response.errMsg
    });
  }
  return response;
};

// 轮播图
export const banner = data => {
  return http.request({
    url: "/banner/36kr",
    method: "GET",
    data
    // handle:true
  });
};

export const wechatLogin = ({ code }) => {
  return http.request({
    url: `/wx/auth/code-to-session?code=${code}`,
    method: "GET"
  });
};

export const getNearShop = ({ latitude, longitude }) => {
  let url = "/ls-coupon/shop";
  if (!isNaN(latitude) && !isNaN(longitude)) {
    url += `?near=${latitude},${longitude}`;
  }
  return http.request({
    url,
    method: "GET"
  });
};

export const getShop = ({ id, latitude, longitude }) => {
  let url = `/ls-coupon/shop/${id}`;
  if (!isNaN(latitude) && !isNaN(longitude)) {
    url += `?near=${latitude},${longitude}`;
  }
  return http.request({
    url,
    method: "GET"
  });
};

export const getCoupons = ({ openid }) => {
  return http.request({
    url: `/ls-coupon/code?openid=${openid}`,
    method: "GET"
  });
};

export const claimCoupons = ({ couponIds, openid, customerNickname }) => {
  return http.request({
    url: `/ls-coupon/code`,
    method: "POST",
    dataType: "json",
    data: {
      customerNickname,
      couponIds,
      openid
    }
  });
};

export const checkCoupons = ({ codeString, openid }) => {
  return http.request({
    url: `/ls-coupon/code`,
    method: "PUT",
    dataType: "json",
    data: {
      codeString,
      openid
    }
  });
};

export const getRecentCodes = ({ shopId, openid }) => {
  return http.request({
    url: `/ls-coupon/code?used=true&shopId=${shopId}&openid=${openid}`
  });
};

export const bindManager = ({ shopId, openid, nickname, displayName }) => {
  return http.request({
    url: `/ls-coupon/shop/manager`,
    method: "POST",
    dataType: "json",
    data: {
      openid,
      shopId,
      nickname,
      displayName
    }
  });
};

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
  test,
  banner
};
