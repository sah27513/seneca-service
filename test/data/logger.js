/* eslint-disable */
export const defaultArgs = {};

export const infoArgs = {
  plugin_name: "example",
  level_name: "info",
  isot: new Date(),
  data: ["Success"],
  pin: {
    role: "example",
    cmd: "*"
  },
  url: "amqp://localhost:5672"
};

export const errorArgs = {
  level_name: "error",
  isot: new Date(),
  data: "Success"
};

export const notice = { kind: "notice" };
export const plugin = { kind: "plugin", case: "READY" };
export const act = { kind: "act", data: ["Success"] };
export const listen = { kind: "listen", data: [] };
export const client = { kind: "client", data: [] };

export const fatalArgs = { level_name: "fatal", isot: new Date() };

export const exampleMessage = "success";

export const exampleActor = "example";
