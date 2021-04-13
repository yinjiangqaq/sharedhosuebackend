//真正的C端用户
"use strict";
const controller = require("egg").Controller;

class CustomerController extends controller {
  async getUserList() {
    const { ctx, app } = this;
    const result = await ctx.curl(
      `${app.config.blockChain_Baseurl}`,
      {
        method: "post",
        dataType: "json", //默认是form，
        data: {},
      }
    );
    return ctx.success({ data: result });
  }
}
module.exports = CustomerController;
