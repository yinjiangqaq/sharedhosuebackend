"use strict";

const controller = require("egg").Controller;
const MODULE = "enter into RoomController";
class RoomController extends controller {
  async addRoom() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    // console.log(query);
    const paramsObj = app.constant.blockChain.roomInputParams;
    paramsObj.funcName = "increaseAppartment";
    if (
      !query.name ||
      !query.address ||
      !query.owner ||
      !query.contact ||
      !query.description ||
      !query.price
    ) {
      return ctx.fail({ msg: "配置参数列表不能为空" });
    }
    paramsObj.funcParam = [
      query.name,
      query.address,
      query.owner,
      query.contact,
      query.description,
      +query.price,
    ];
    console.log(MODULE, paramsObj);
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

  async changeRoom() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.roomInputParams;
    paramsObj.funcName = "setAppartment";
    if (
      !query.name ||
      !query.address ||
      !query.owner ||
      !query.contact ||
      !query.description ||
      !query.price
    ) {
      return ctx.fail({ msg: "配置参数列表不能为空" });
    }
    paramsObj.funcParam = [
      query.name,
      query.address,
      query.owner,
      query.contact,
      query.description,
      +query.price,
    ];
    console.log(MODULE, paramsObj);
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

  async findRoom() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.roomInputParams;
    paramsObj.funcName = "getAppartment";
    const arr = [
      query.name === undefined ? "" : query.name,
      query.owner === undefined ? "" : query.owner,
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
      0: "name",
      1: "address",
      2: "owner",
      3: "contact",
      4: "description",
      5: "price",
    };
    for (let i = 0; i < length; i++) {
      let obj = {
        name: "",
        address: "",
        owner: "",
        contact: "",
        description: "",
        price: null,
      };
      for (let j = 0; j < y; j++) {
        obj[hash[j]] = result.data[j][i];
      }
      resultArr.push(obj);
    }
    if (result.status === 200) {
      return ctx.success({ data: resultArr });
    }
  }
  async deleteRoom() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.roomInputParams;
    paramsObj.funcName = "removeAppartment";
    const arr = [query.name === undefined ? "" : query.name];
    paramsObj.funcParam = arr;
    console.log(MODULE, paramsObj);
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

  //公寓租赁
  //查找订单
  async findRoomCase() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.caseInputParams;
    paramsObj.funcName = "getOrder";
    const arr = [
      query.pageNum === undefined ? 1 : query.pageNum,
      !!!query.time ? 0 : query.time[0],
      !!!query.time ? 99999999999 : query.time[1],
      query.caseId === undefined ? 0 : +query.caseId,
      query.name === undefined ? "" : query.name,
      0,
      app.constant.common.caseType.room,
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
      2: "name",
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
        name: "",
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
  //公寓订单操作
  async roomCaseAction() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const paramsObj = app.constant.blockChain.caseInputParams;
    paramsObj.funcName = "setOrder";
    const arr = [
      query.caseId === undefined ? 0 : +query.caseId,
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

module.exports = RoomController;
