"use strict";

const controller = require("egg").Controller;
const MODULE = "enter into HistoryController";

class HistoryController extends controller {
  //查找订单
  async findCase() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.caseInputParams;
    paramsObj.funcName = "getOrder";
    const arr = [
      query.pageNum === undefined ? 1 : query.pageNum,
      query.time === undefined ? 0 : query.time[0],
      query.time === undefined ? 99999999999 : query.time[1],
      query.caseId === undefined ? "" : query.caseId,
      "",
      query.state === undefined ? 1 : query.state,
      app.constant.common.caseType.history,
    ];
    paramsObj.funcParam = arr;
    //console.log(MODULE, paramsObj);
    console.log(arr);
    const result = await ctx.curl(`${app.config.blockChain_Baseurl}`, {
      method: "post",
      dataType: "json",
      contentType: "json", //把传过去的内容转为json
      data: paramsObj,
    });
    console.log(MODULE, result.data);
    //hash配置对表驳回的，或者未完成的
    const hash = {
      1: "caseId",
      2: "caseName",
      3: "customer",
      4: "time",
      5: "state",
      6: "reason",
      7: "file",
    };
    //state为通过的哈希表
    const hash_2 = {
      1: "caseId",
      2: "caseName",
      3: "customer",
      4: "time",
      5: "state",
      6: "creditLess",
      7: "file",
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
        caseId: null,
        caseName: "",
        customer: "",
        time: null,
        state: null,
        creditLess: "",
        file:''
      };
      //排除第一个总数的项
      for (let j = 1; j < y; j++) {
        //返回给前端的查找数据需要重新处理成creditless的形状，当时通过的时候
        if (query.state === 1 && j === 6) {
          let temp = app.constant.common.creditLess.find(
            (item) => item.label === result.data[j][i]
          );
          obj[hash_2[j]] = !!temp ? temp.value : 0;
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
  //扣除信用分
  async deduceCredit() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.caseInputParams;
    paramsObj.funcName = "deduceCredit";
    const picUrl =
      typeof query.file === "object"
        ? query.file.file.response.data.file
        : query.file; //上传的图片的地址
    //这里发给区块链那边需要是具体的原因，字符串，所以这边需要处理成字符串
    const arr = [
      query.caseId === undefined ? "" : query.caseId,
      !!!query.creditLess
        ? "无"
        : app.constant.common.creditLess.find(
            (item) => item.value === query.creditLess
          ).label,
      picUrl,
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
    if (result.status === 200) {
      return ctx.success({ data: result.data });
    } else {
      return ctx.fail({ msg: "请求失败" });
    }
  }
}

module.exports = HistoryController;
