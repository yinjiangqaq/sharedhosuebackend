"use strict";

const controller = require("egg").Controller;
const MODULE = "enter into UploadController";
const fs = require("fs");
const pump = require("pump");
class UploadController extends controller {
  //图片上传接口
  async upload() {
    console.log(MODULE);
    const { ctx, app } = this;
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname; // file表单的名字
      // 上传图片的目录
      const dir = await ctx.service.tools.index.getUploadFile(stream.filename);
      const target = dir.uploadDir; //目标地址
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }

    if (Object.keys(files).length > 0) {
      return ctx.success({ msg: "图片上传成功", data: files });
    } else {
      return ctx.fail({ msg: "图片上传失败" });
    }
  }
}

module.exports = UploadController;
