"use strict";

const controller = require("egg").Controller;
const MODULE = "enter into DeviceController";

class DeviceController extends controller {
  async addDevice() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.commonInputParms;
    paramsObj.funcName = "insertFacilityType";
    if (
      !query.address ||
      !query.contact ||
      !query.description ||
      !query.device ||
      !query.owner
    ) {
      return ctx.fail({ msg: "配置参数列表不能为空" });
    }
    if (
      query.setType === 0 &&
      (!query.PriceList ||
        query.PriceList.filter(
          (item) => item.time.length === 0 || !!item.price === false
        ).length > 0)
    ) {
      return ctx.fail({
        msg: "按时计费的时段设置不能为空或者价格设置不能为空",
      });
    } else if (+query.setType > 0 && !query.price) {
      return ctx.fail({ msg: "价格不能为空" });
    } else if (query.setType !== 0 && !!query.setType === false) {
      return ctx.fail({ msg: "套餐类型不能为空" });
    }
    //按小时计费的时段数组
    let tempArr = [];
    if (query.PriceList && query.PriceList.length > 0) {
      query.PriceList.map((item) => {
        tempArr.push(`${item.time[0]}-${item.time[1]}-${+item.price}`);
      });
    }
    paramsObj.funcParam = [
      query.device,
      query.owner,
      query.contact,
      query.address,
      query.description,
      query.setType,
      tempArr.join("/"),
      !!query.price ? +query.price : 0,
    ];
    console.log(MODULE, paramsObj);
    const result = await ctx.curl(`${app.config.blockChain_Baseurl}`, {
      method: "post",
      dataType: "json",
      contentType: "json", //把传过去的内容转为json
      data: paramsObj,
    });
    console.log(MODULE, result.data);
    if (result.status === 200 && result.data.message === "Success") {
      return ctx.success({ data: result.data });
    } else {
      return ctx.fail({ data: result.data });
    }
  }

  async findDevice() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.commonInputParms;
    paramsObj.funcName = "getType";
    const arr = [
      query.device === undefined ? "" : query.device,
      query.name === undefined ? "" : query.name,
    ];
    paramsObj.funcParam = arr;
    console.log(MODULE, paramsObj);
    const result = await ctx.curl(`${app.config.blockChain_Baseurl}`, {
      method: "post",
      dataType: "json",
      contentType: "json", //把传过去的内容转为json
      data: paramsObj,
    });
    console.log(MODULE, result.data);
    let y = result.data.length;
    let length = result.data[0].length;
    let resultArr = [];
    //hash配对表
    const hash = {
      0: "device",
      1: "owner",
      2: "contact",
      3: "address",
      4: "description",
      5: "setType",
      6: "PriceList",
      7: "price",
    };
    for (let i = 0; i < length; i++) {
      let obj = {
        device: "",
        owner: "",
        contact: "",
        address: "",
        description: "",
        setType: null,
        PriceList: [],
        price: null,
      };
      for (let j = 0; j < y; j++) {
        if (j === 6) {
          let temp = result.data[j][i].split("/");
          temp.map((item) => {
            let tem = item.split("-");
            obj[hash[j]].push({ time: [tem[0], tem[1]], price: +tem[2] });
          });
        } else {
          obj[hash[j]] = result.data[j][i];
        }
      }
      resultArr.push(obj);
    }
    if (result.status === 200) {
      return ctx.success({ data: resultArr });
    }
  }
  //更改公共设施配置
  async changeDevice() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.commonInputParms;
    paramsObj.funcName = "setType";
    if (
      !query.address ||
      !query.contact ||
      !query.description ||
      !query.device ||
      !query.owner
    ) {
      return ctx.fail({ msg: "配置参数列表不能为空" });
    }
    if (
      query.setType === 0 &&
      (!query.PriceList ||
        query.PriceList.filter(
          (item) => item.time.length === 0 || !!item.price === false
        ).length > 0)
    ) {
      return ctx.fail({
        msg: "按时计费的时段设置不能为空或者价格设置不能为空",
      });
    } else if (+query.setType > 0 && !query.price) {
      return ctx.fail({ msg: "价格不能为空" });
    } else if (query.setType !== 0 && !!query.setType === false) {
      return ctx.fail({ msg: "套餐类型不能为空" });
    }
    //按小时计费的时段数组
    let tempArr = [];
    if (query.PriceList && query.PriceList.length > 0) {
      query.PriceList.map((item) => {
        tempArr.push(`${item.time[0]}-${item.time[1]}-${+item.price}`);
      });
    }
    paramsObj.funcParam = [
      query.owner,
      query.contact,
      query.address,
      query.description,
      query.setType,
      tempArr.join("/"),
      !!query.price ? +query.price : 0,
    ];
    console.log(MODULE, paramsObj);
    const result = await ctx.curl(`${app.config.blockChain_Baseurl}`, {
      method: "post",
      dataType: "json",
      contentType: "json", //把传过去的内容转为json
      data: paramsObj,
    });
    console.log(MODULE, result.data);
    if (result.status === 200 && result.data.message === "Success") {
      return ctx.success({ data: result.data });
    } else {
      return ctx.fail({ data: result.data });
    }
  }
  //删除公共设施
  async deleteDevice() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.commonInputParms;
    paramsObj.funcName = "removeType";
    const arr = [
      query.address === undefined ? "" : query.address,
      query.setType === undefined ? "" : query.setType,
    ];
    paramsObj.funcParam = arr;
    console.log(paramsObj.funcParam);
    const result = await ctx.curl(`${app.config.blockChain_Baseurl}`, {
      method: "post",
      dataType: "json",
      contentType: "json", //把传过去的内容转为json
      data: paramsObj,
    });
    console.log(MODULE, result.data);
    if (result.status === 200) {
      return ctx.success({ data: result.data });
    }
  }
  //公共设施租赁接口
  //查找
  async findDeviceCase() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.caseInputParams;
    paramsObj.funcName = "getOrder";
    const arr = [
      query.pageNum === undefined ? 1 : query.pageNum,
      !!!query.time ? 0 : query.time[0],
      !!!query.time ? 99999999999 : query.time[1],
      query.caseId === undefined ? "" : query.caseId,
      query.name === undefined ? "" : query.name,
      0,
      app.constant.common.caseType.common,
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
      1: "caseId",
      2: "device",
      3: "customer",
      4: "time",
      5: "state",
      6: "reason",
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
        device: "",
        customer: "",
        time: null,
        state: null,
        reason: "",
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
  //公共设施订单操作
  async deviceCaseAction() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.caseInputParams;
    paramsObj.funcName = "setOrder";
    const arr = [
      query.caseId === undefined ? "" : query.caseId,
      query.state,
      !!!query.reason ? "无" : query.reason,
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

module.exports = DeviceController;
