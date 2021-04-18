"use strict";

//违规行为

const creditLess = [
  {
    label: "毁坏或偷窃公寓物品",
    value: 30,
  },
  {
    label: "毁坏公共设施",
    value: 20,
  },
  {
    label: "在公寓进行黄赌毒等违法行为",
    value: 50,
  },
  {
    label: "恶意污染公寓环境",
    value: 10,
  },
  {
    label: "无",
    value: 0,
  },
];

const caseType = {
  room: 1, //公寓
  common: 2, //公共设施
  history: 3, //历史订单，包括公共设施和公寓
};

module.exports = { creditLess, caseType };
