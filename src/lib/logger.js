import chalk from "chalk";
import * as log from "lib/logger";

export const format = args => {
  // Get the Log Level
  const level =
    args.level_name === "info"
      ? chalk.green(`${args.level_name}:`)
      : chalk.red(`${args.level_name}:`);

  // Get The timestamp
  const time = chalk.blue(`[${args.isot}]`);

  // Get the Actor
  const actor = log.checkPlugin(args);

  // Construct the Message
  const message = log.checkKind(args);

  // Only Log if there is a message
  if (message) console.log(`${level} ${time} ${actor}${message}`);
};

export const checkPlugin = args => {
  return args.plugin_name ? chalk.yellow(`(${args.plugin_name}): `) : "";
};

export const constructQueue = data => {
  const queue = Object.keys(data.pin)
    .map(key => `${key}_${data.pin[key]}`)
    .join("_")
    .replace(/\*/g, "any");
  return `${data.url}/${queue}`;
};

export const checkKind = args => {
  switch (args.kind) {
    case "listen":
      return `Receiving Messages at: ${log.constructQueue(args.data[0])}`;
    case "client":
      return `Sending Messages at: ${log.constructQueue(args.data[0])}`;
    case "act":
      return args.data[0];
    case "plugin":
      return args.case;
    case "notice":
    default:
      return false;
  }
};

export const logger = args => {
  switch (args.level_name) {
    case "fatal":
    case "error":
    case "info":
      log.format(args);
      break;
    default:
      console.log(args);
      break;
  }
};
