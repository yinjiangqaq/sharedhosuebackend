"use strict";

const service = require("egg").Service;

class EmailService extends service {
  async add(params) {
    const { app, ctx } = this;
    return await ctx.model.Email.create({
      ...params,
    });
  }
  async get(params) {
    const { app, ctx } = this;
    const email = await app.model.Email.findOne({
      where: { ...params },
    });
    return email;
  }
}

module.exports = EmailService;
