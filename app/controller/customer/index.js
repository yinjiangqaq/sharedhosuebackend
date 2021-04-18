//真正的C端用户
"use strict";
const controller = require("egg").Controller;
const MODULE = "enter into RoomController";
class CustomerController extends controller {
  async getUserList() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.userInputParams;
    paramsObj.funcName = "getUser";
    const arr = [
      query.pageNum === undefined ? 1 : query.pageNum,
      !!!query.userName ? "" : query.userName,
      !!!query.userId ? 0 : +query.userId,
      !!!query.email ? "" : query.email,
    ];
    paramsObj.funcParam = arr;
    const result = await ctx.curl(`${app.config.blockChain_Baseurl}`, {
      method: "post",
      dataType: "json",
      contentType: "json", //把传过去的内容转为json
      data: paramsObj,
    });
    console.log(MODULE, result.data);
    //hash配置对表
    const hash = {
      1: "userName",
      2: "userId",
      3: "email",
      4: "role",
      5: "credit",
    };
    let y = result.data.length;
    if (y === 0)
      return ctx.success({
        data: {
          sum: 0,
          caseData: [],
        },
      });
    let length = result.data[1].length;
    let resultArr = [];
    for (let i = 0; i < length; i++) {
      let obj = {
        userName: "",
        userId: null,
        email: "",
        role: null,
        credit: null,
      };
      //排除第一个总数的项
      for (let j = 1; j < y; j++) {
        obj[hash[j]] = result.data[j][i];
      }
      resultArr.push(obj);
    }
    let resultObj = {
      sum: result.data[0],
      caseData: resultArr,
    };
    if (result.status === 200) {
      return ctx.success({ data: resultObj });
    } else {
      return ctx.fail({ msg: "请求失败" });
    }
  }
  //获取信用记录列表
  async getUserCreditList() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.caseInputParams;
    paramsObj.funcName = "getBreakOrder";
    const arr = [
      query.pageNum === undefined ? 1 : query.pageNum,
      query.userId === undefined ? 0 : +query.userId,
      query.caseId === undefined ? 0 : +query.caseId,
      !!!query.creditLess
        ? "毁坏公共设施"
        : app.constant.common.creditLess.find(
            (item) => item.value === query.creditLess
          ).label,
    ];
    paramsObj.funcParam = arr;
    console.log(arr);
    const result = await ctx.curl(`${app.config.blockChain_Baseurl}`, {
      method: "post",
      dataType: "json",
      contentType: "json", //把传过去的内容转为json
      data: paramsObj,
    });
    console.log(MODULE, result.data);
    //hash配置对表
    const hash = {
      1: "userName",
      2: "userId",
      3: "caseId",
      4: "creditLess",
    };
    let y = result.data.length;
    if (y === 0)
      return ctx.success({
        data: {
          sum: 0,
          caseData: [],
        },
      });
    let length = result.data[1].length;
    let resultArr = [];
    for (let i = 0; i < length; i++) {
      let obj = {
        userName: "",
        userId: null,
        caseId: null,
        creditLess: "",
      };
      //排除第一个总数的项
      for (let j = 1; j < y; j++) {
        //返回给前端的查找数据需要重新处理成creditless的形状，当时通过的时候
        if (j === 4) {
          let temp = app.constant.common.creditLess.find(
            (item) => item.label === result.data[j][i]
          );
          obj[hash[j]] = !!temp ? temp.value : 0;
        } else {
          obj[hash[j]] = result.data[j][i];
        }
      }
      resultArr.push(obj);
    }
    let resultObj = {
      sum: result.data[0],
      caseData: resultArr,
    };
    if (result.status === 200) {
      return ctx.success({ data: resultObj });
    } else {
      return ctx.fail({ msg: "请求失败" });
    }
  }
}
module.exports = CustomerController;
