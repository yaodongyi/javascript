/*
 * @Author: yaodongyi
 * @Date: 2019-08-10 10:32:18
 * @Description: api接口
 */
import axios from './http.js';
/**
 * 登陆接口
 * @param {Object} params
 * @api {post} https://www.easy-mock.com/mock/5ccec7de7ffbe958f9bc418b/all
 */
export const all_api = params => {
  return axios.get(`all`, params);
};


