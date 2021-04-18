"use strict";

//公寓配置
const roomInputParams = {
  groupId: 1,
  signUserId: "ae85ce1015f54a00b199bcc2b176acb6",
  contractAbi: [
    {
      constant: true,
      inputs: [
        { name: "name", type: "string" },
        { name: "landlord", type: "string" },
      ],
      name: "getAppartment",
      outputs: [
        { name: "", type: "string[]" },
        { name: "", type: "string[]" },
        { name: "", type: "string[]" },
        { name: "", type: "string[]" },
        { name: "", type: "string[]" },
        { name: "", type: "uint256[]" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "oldLoadlord", type: "string" },
        { name: "name", type: "string" },
      ],
      name: "removeLAppartment",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "name", type: "string" },
        { name: "_position", type: "string" },
        { name: "_landlord", type: "string" },
        { name: "_phone", type: "string" },
        { name: "_describe", type: "string" },
        { name: "_pricesByOneday", type: "uint256" },
      ],
      name: "setAppartment",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_landlord", type: "string" }],
      name: "isExistLandlord",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_name", type: "string" },
        { name: "_position", type: "string" },
        { name: "_landlord", type: "string" },
        { name: "_phone", type: "string" },
        { name: "_describe", type: "string" },
        { name: "_pricesByOneday", type: "uint256" },
      ],
      name: "increaseAppartment",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "name", type: "string" }],
      name: "removeAppartment",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_name", type: "string" }],
      name: "isExistAppartment",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ name: "userAddress", type: "address" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
  ],
  contractAddress: "0x9b5fa2c37cfe567eaaa73f29686478e844d866d2",
  funcName: "getAppartment",
  funcParam: ["", ""],
  useCns: false,
};
//公共设施配置
const commonInputParms = {
  groupId: 1,
  signUserId: "ae85ce1015f54a00b199bcc2b176acb6",
  contractAbi: [
    {
      constant: true,
      inputs: [
        { name: "position", type: "string" },
        { name: "typeNum", type: "uint256" },
      ],
      name: "isExistType",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "position", type: "string" },
        { name: "typeNum", type: "uint256" },
      ],
      name: "removeType",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "_name", type: "string" },
        { name: "_landlord", type: "string" },
      ],
      name: "getType",
      outputs: [
        { name: "name", type: "string[]" },
        { name: "landlord", type: "string[]" },
        { name: "phone", type: "string[]" },
        { name: "position", type: "string[]" },
        { name: "describe", type: "string[]" },
        { name: "typeNum", type: "uint256[]" },
        { name: "price", type: "uint256[]" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "name", type: "string" },
        { name: "landlord", type: "string" },
        { name: "phone", type: "string" },
        { name: "position", type: "string" },
        { name: "describe", type: "string" },
        { name: "typeNum", type: "uint256" },
        { name: "price", type: "uint256" },
      ],
      name: "insertFacilityType",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "position", type: "string" }],
      name: "isExistFacility",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_landlord", type: "string" },
        { name: "_phone", type: "string" },
        { name: "_position", type: "string" },
        { name: "_describe", type: "string" },
        { name: "_typeNum", type: "uint256" },
        { name: "_price", type: "uint256" },
      ],
      name: "setType",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ name: "userAddress", type: "address" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
  ],
  contractAddress: "0xa2c17296e076a979d910cfd1c7cebb832c8ec827",
  funcName: "",
  funcParam: [],
  useCns: false,
};

//租赁管理订单的给区块链后台的默认参数,还有信用管理
const caseInputParams = {
  groupId: 1,
  signUserId: "ae85ce1015f54a00b199bcc2b176acb6",
  contractAbi: [
    {
      constant: false,
      inputs: [
        { name: "_orderId", type: "uint256" },
        { name: "_state", type: "uint256" },
        { name: "_reason", type: "string" },
      ],
      name: "setOrder",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_orderId", type: "uint256" }],
      name: "isExistOrderId",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "pageNum", type: "uint256" },
        { name: "_userId", type: "uint256" },
        { name: "_orderId", type: "uint256" },
        { name: "_reason", type: "string" },
      ],
      name: "getBreakOrder",
      outputs: [
        { name: "", type: "uint256" },
        { name: "", type: "string[]" },
        { name: "", type: "uint256[]" },
        { name: "", type: "uint256[]" },
        { name: "", type: "string[]" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_userName", type: "string" },
        { name: "_userId", type: "uint256" },
        { name: "_Name", type: "string" },
        { name: "_orderTime", type: "uint256" },
        { name: "_startDate", type: "uint256" },
        { name: "_finishDate", type: "uint256" },
      ],
      name: "increaseAppartmentOrder",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_userName", type: "string" },
        { name: "_userId", type: "uint256" },
        { name: "_Name", type: "string" },
        { name: "_orderTime", type: "uint256" },
        { name: "_startDate", type: "uint256" },
        { name: "_finishDate", type: "uint256" },
      ],
      name: "increaseFacilityOrder",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_orderId", type: "uint256" },
        { name: "_reason", type: "string" },
      ],
      name: "deduceCredit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "pageNum", type: "uint256" },
        { name: "_startDate", type: "uint256" },
        { name: "_finishDate", type: "uint256" },
        { name: "_orderId", type: "uint256" },
        { name: "_name", type: "string" },
        { name: "_state", type: "uint256" },
        { name: "_orderType", type: "uint256" },
      ],
      name: "getOrder",
      outputs: [
        { name: "", type: "uint256" },
        { name: "", type: "uint256[]" },
        { name: "", type: "string[]" },
        { name: "", type: "string[]" },
        { name: "", type: "uint256[]" },
        { name: "", type: "uint256[]" },
        { name: "", type: "string[]" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ name: "userAddress", type: "address" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
  ],
  contractAddress: "0xe010024bc8f7cffdc20e8160f4314703f8457256",
  funcName: "",
  funcParam: [],
  useCns: false,
};
//用户管理
const userInputParams = {
  groupId: 1,
  signUserId: "ae85ce1015f54a00b199bcc2b176acb6",
  contractAbi: [
    {
      constant: true,
      inputs: [
        { name: "pageNum", type: "uint256" },
        { name: "_username", type: "string" },
        { name: "_userId", type: "uint256" },
        { name: "_usermail", type: "string" },
      ],
      name: "getUser",
      outputs: [
        { name: "", type: "uint256" },
        { name: "", type: "string[]" },
        { name: "", type: "uint256[]" },
        { name: "", type: "string[]" },
        { name: "", type: "uint256[]" },
        { name: "", type: "uint256[]" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_id", type: "uint256" },
        { name: "_decreaseNum", type: "uint256" },
      ],
      name: "decreaseCredit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "condition1", type: "string" },
        { name: "_userpassword", type: "string" },
      ],
      name: "login",
      outputs: [
        { name: "", type: "string" },
        { name: "", type: "uint256" },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_id", type: "uint256" },
        { name: "_increaseNum", type: "uint256" },
      ],
      name: "increaseCredit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "money", type: "uint256" }],
      name: "decreaseAmount",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_userAddress", type: "address" },
        { name: "_username", type: "string" },
        { name: "_userpassword", type: "string" },
        { name: "_userType", type: "uint256" },
        { name: "_phone", type: "string" },
        { name: "_mail", type: "string" },
        { name: "_signatureId", type: "string" },
      ],
      name: "createUser",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_username", type: "string" }],
      name: "isExitLandl",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_username", type: "string" }],
      name: "isExitUsername",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_id", type: "uint256" },
        { name: "_amount", type: "uint256" },
      ],
      name: "increaseAmount",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getUserNum",
      outputs: [{ name: "num", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
  ],
  contractAddress: "0x78ee4451ea1333782eaba218e83b868521314565",
  funcName: "",
  funcParam: [],
  useCns: false,
};
module.exports = {
  roomInputParams,
  commonInputParms,
  caseInputParams,
  userInputParams,
};
