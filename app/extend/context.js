"use strict";

module.exports = {
  /**
   * @description 成功返回
   * @param {*}{ status=200, message,data={}}
   */
  //success的参数包装成一个大对象，包装一层
  success({ code = 0, status = 200, msg, data = {} }) {
    this.body = {
      code,
      status,
      data,
      msg: msg,
      success: true,
    };
  },
  /**
   * @description 返回失败
   * @param {*} { code = 0, msg, data = {} }
   */
  fail({ code = -1, msg, data = {} }) {
    this.body = {
      code,
      data,
      msg: msg,
      success: false,
    };
  },
};
