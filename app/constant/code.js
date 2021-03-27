"use strict";

const RESPONSE_CODE = {
  SUCCESS: 0,
  REDIRECT: 302,
  NETWORK_ERROR: 406,
  TOKEN_CHECK_FAILED: 407,
  TOKEN_EXPIRED: 408,
  SERVER_ERROR: 500,
};

const CODE_MESSAGES = {
  302: "redirect cas location",
  406: "NetWork Error",
  407: "Token check failed",
  408: "Token expired",
  500: "Server error",
};

module.exports = {
  RESPONSE_CODE,
  CODE_MESSAGES,
};
