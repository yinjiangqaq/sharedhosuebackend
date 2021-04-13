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
}

module.exports = RoomController;
