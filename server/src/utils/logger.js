const pino = require("pino");
const pinoHttp = require("pino-http");

const logger = pino({
  level: "info",
  transport:
    process.env.NODE_ENV === "production"
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "yyyy-mm-dd HH:MM:ss",
            ignore: "pid,hostname",
          },
        },
  base: {
    pid: false,
    hostname: false,
  },
});

const httpLogger = pinoHttp({
  logger,
  customLogLevel: function (req, res, err) {
    return "info";
  },
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
    err(err) {
      return {
        message: err.message,
        stack: err.stack,
      };
    },
  },
});

module.exports = {
  logger,
  httpLogger,
};
