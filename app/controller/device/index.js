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
      !query.owner ||
      !query.price ||
      !query.setType
    ) {
      return ctx.fail({ msg: "配置参数列表不能为空" });
    }
    paramsObj.funcParam = [
      query.device,
      query.owner,
      query.contact,
      query.address,
      query.description,
      query.setType,
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
      6: "price",
    };
    for (let i = 0; i < length; i++) {
      let obj = {
        device: "",
        owner: "",
        contact: "",
        address: "",
        description: "",
        setType: null,
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
      !query.owner ||
      !query.price ||
      !query.setType
    ) {
      return ctx.fail({ msg: "配置参数列表不能为空" });
    }
    paramsObj.funcParam = [
      query.owner,
      query.contact,
      query.address,
      query.description,
      query.setType,
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
    console.log(paramsObj.funcParam)
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

module.exports = DeviceController;
