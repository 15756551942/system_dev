/*
 * @Author: your name
 * @Date: 2021-01-21 21:54:12
 * @LastEditTime: 2021-01-21 23:08:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /system_dev/temp.js
 */
// request请求（单独封装的）
import axios from 'axios';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getAuthorization } from '@/utils/utils';
import { timeOutDelayApi } from '@/utils/CONST';

const WITH_CREDENTIALS = true;
const CONTENT_TYPE = 'Content-Type';

const URLENCODED = 'application/json;charset=UTF-8';

// 设置全局的请求次数，请求的间隙
axios.defaults.retry = 1;
axios.defaults.retryDelay = 1000;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

message.config({
  maxCount: 1
});
let pending = [];
let { CancelToken } = axios;
let cancelPending = config => {
  pending.forEach((item, index) => {
    // if (config) {
    //   if (item.u === config.url) {
    //     item.f(); // 取消请求
    //     pending.splice(index, 1); // 移除当前请求记录
    //   }
    // } else {
    //   item.f(); // 取消请求
    //   pending.splice(index, 1); // 移除当前请求记录
    // }
  });
};

// http request 拦截器
axios.interceptors.request.use(
  function(config) {
    cancelPending(config);
    config.cancelToken = new CancelToken(c => {
      pending.push({ u: config.url, f: c });
    });
    // 在请求发出之前进行一些操作
    return config;
  },
  function(err) {
    // Do something with request error
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    // info = {
    //   status:200,
    //   data:{
    //     sucess: false,
    //     errmsg: '数据不存在',
    //     content: {name: 'lance'}
    //   }
    // }
    return response;
  },
  err => {
    // 请求超时，设置重新请求及错误提示
    const { dispatch } = window.g_app._store;
    // let { config } = err;
    const res = JSON.parse(JSON.stringify(err));
    let status = res && res.response && res.response.status;
    let errorMsg =
      res &&
      res.response &&
      res.response.data &&
      `${res.response.data.title}`;
    if ((status <= 200 || status >= 400) && errorMsg) {
      message.error(errorMsg);
    }
    if (status === 401) {
      let isLoginErr = '';
      if (res && res.response && res.response.data && res.response.data.path === '/api/login') {
        isLoginErr = 'isLoginErr';
      }
      dispatch({
        type: 'login/logout',
        payload: isLoginErr
      });
    }
    if (status === 403) {
      dispatch(routerRedux.push('/exception/403'));
    }
    if (status >= 404 && status < 422) {
      dispatch(routerRedux.push('/exception/404'));
    }
    if (status === 500) return message.error('服务器出错');
    if (status <= 504 && status > 500) {
      dispatch(routerRedux.push('/exception/500'));
    }
    if (!status && res.code === 'ECONNABORTED') {
      return message.error('连接超时');
    }
    return res;
  }
);

/**
 * 发起一个请求
 * @param {string} method HTTP method
 * @param {string} url 请求的目标 URL
 * @param {object} params 请求参数对象
 * @param {object} opts 请求选项
 */
export async function request(method, url, params, opts = {}) {
  const HEADEERS = {
    Accept: 'application/json',
    [CONTENT_TYPE]: URLENCODED,
    Authorization: getAuthorization()
  };
  opts = Object.assign({}, opts);
  const headers = Object.assign({}, HEADEERS, opts.headers);
  // const withCredentials = opts.withCredentials || WITH_CREDENTIALS;
  let timeOut = 20000;
  if (timeOutDelayApi.includes(url)) {
    timeOut = 40000;
  }
  let config = {
    method: method,
    url: url,
    headers: headers,
    withCredentials: true,
    timeout: opts && opts.timeout ? opts.timeout : timeOut
  };
  switch (method) {
    case 'GET': // get请求
      config = Object.assign(config, { params: params });
      break;
    case 'POST':
      config = Object.assign(config, { data: params });
      break;
    case 'PUT':
      config = Object.assign(config, { data: params });
      break;
    case 'DELETE':
      config = Object.assign(config, { data: params });
      break;
    case 'PATCH':
      config = Object.assign(config, { data: params });
      break;
    default:
      console.log('no_match');
  }

  try {
    const res = await axios(config);
    return res;
  } catch (e) {
    return {};
  }
}

/**
 * 发起一个 get 请求
 * @param {*} args 参数：url,param,opts
 */
export function get(...args) {
  return request('GET', ...args);
}

/**
 * 发起一个 post 请求
 * @param {*} args 参数：url,param,opts
 */
export function post(...args) {
  return request('POST', ...args);
}

/**
 * 发起一个 put 请求
 * @param {*} args 参数：url,param,opts
 */
export function put(...args) {
  return request('PUT', ...args);
}

/**
 * 发起一个 delete 请求
 * @param {*} args 参数：url,param,opts
 */
export function deletes(...args) {
  return request('DELETE', ...args);
}

/**
 * 发起一个 patch 请求
 * @param {*} args 参数：url,param,opts
 */
export function patch(...args) {
  return request('PATCH', ...args);
}