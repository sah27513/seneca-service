import * as logger from "lib/logger";
import chalk from "chalk";

// Mock Modules
jest.mock("chalk", () => ({
  green: jest.fn(),
  blue: jest.fn(),
  yellow: jest.fn(),
  grey: jest.fn(),
  red: jest.fn()
}));

// Import the Mock Data
import {
  plugin,
  act,
  listen,
  client,
  notice,
  exampleActor,
  exampleMessage,
  defaultArgs,
  infoArgs,
  errorArgs,
  fatalArgs
} from "test/data";

describe("Seneca Logging Module", () => {
  beforeEach(() => {
    jest.spyOn(logger, "format");
    jest.spyOn(logger, "checkPlugin");
    jest.spyOn(logger, "checkKind");
    jest.spyOn(logger, "constructQueue");
    jest.spyOn(console, "log").mockReturnValue();
    jest.spyOn(Object, "keys");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe("Logger", () => {
    test("It does not format default args", async next => {
      // Setup the Test
      logger.format.mockReturnValue();

      // Run the Test
      logger.logger(defaultArgs);

      // Assertions
      expect(logger.format).not.toHaveBeenCalledWith(defaultArgs);
      expect(console.log).toHaveBeenCalledWith(defaultArgs);

      // Complete the Test
      next();
    });

    test("It formats info args", async next => {
      // Setup the Test
      logger.format.mockReturnValue();

      // Run the Test
      logger.logger(infoArgs);

      // Assertions
      expect(logger.format).toHaveBeenCalledWith(infoArgs);

      // Complete the Test
      next();
    });

    test("It formats error args", async next => {
      // Setup the Test
      logger.format.mockReturnValue();

      // Run the Test
      logger.logger(errorArgs);

      // Assertions
      expect(logger.format).toHaveBeenCalledWith(errorArgs);

      // Complete the Test
      next();
    });

    test("It formats fatal args", async next => {
      // Setup the Test
      logger.format.mockReturnValue();

      // Run the Test
      logger.logger(fatalArgs);

      // Assertions
      expect(logger.format).toHaveBeenCalledWith(fatalArgs);

      // Complete the Test
      next();
    });
  });

  describe("Formatter", () => {
    test("It Logs an info message when present", async next => {
      // Setup the Test
      logger.checkPlugin.mockReturnValue(exampleActor);
      logger.checkKind.mockReturnValue(exampleMessage);

      // Mock Chalk returns
      chalk.green.mockReturnValue(`${infoArgs.level_name}:`);
      chalk.blue.mockReturnValue(`[${infoArgs.isot}]`);
      chalk.grey.mockReturnValue(exampleActor);

      // Run the Test
      logger.format(infoArgs);

      // Assertions
      expect(console.log).toHaveBeenCalledWith(
        `${infoArgs.level_name}: [${infoArgs.isot}] ${exampleActor}${exampleMessage}`
      );

      // Complete the Test
      next();
    });

    test("It Logs any other messages when present", async next => {
      // Setup the Test
      logger.checkPlugin.mockReturnValue(exampleActor);
      logger.checkKind.mockReturnValue(exampleMessage);

      // Mock Chalk returns
      chalk.red.mockReturnValue(`${errorArgs.level_name}:`);
      chalk.blue.mockReturnValue(`[${errorArgs.isot}]`);
      chalk.grey.mockReturnValue(exampleActor);

      // Run the Test
      logger.format(errorArgs);

      // Assertions
      expect(console.log).toHaveBeenCalledWith(
        `${errorArgs.level_name}: [${errorArgs.isot}] ${exampleActor}${exampleMessage}`
      );

      // Complete the Test
      next();
    });

    test("It does not log a message when not present", async next => {
      // Setup the Test
      logger.checkPlugin.mockReturnValue(exampleActor);
      logger.checkKind.mockReturnValue(null);

      // Run the Test
      logger.format(errorArgs);

      // Assertions
      expect(console.log).not.toHaveBeenCalled();

      // Complete the Test
      next();
    });
  });

  describe("Log Kind", () => {
    test("It does not log empty", async next => {
      // Run the Test
      const kind = logger.checkKind({});

      // Assertions
      expect(kind).toEqual(false);

      // Complete the Test
      next();
    });

    test("It does not log notices", async next => {
      // Run the Test
      const kind = logger.checkKind(notice);

      // Assertions
      expect(kind).toEqual(false);

      // Complete the Test
      next();
    });

    test("It returns data for Act", async next => {
      // Run the Test
      const kind = logger.checkKind(act);

      // Assertions
      expect(kind).toEqual(act.data[0]);

      // Complete the Test
      next();
    });

    test("It returns case for plugin", async next => {
      // Run the Test
      const kind = logger.checkKind(plugin);

      // Assertions
      expect(kind).toEqual(plugin.case);

      // Complete the Test
      next();
    });

    test("It returns Service Client for client", async next => {
      // Setup the Test
      logger.constructQueue.mockReturnValue("");

      // Run the Test
      const kind = logger.checkKind(client);

      // Assertions
      expect(kind).toEqual(`Sending Messages at: `);

      // Complete the Test
      next();
    });

    test("It returns Service Listener for listen", async next => {
      // Setup the Test
      logger.constructQueue.mockReturnValue("");

      // Run the Test
      const kind = logger.checkKind(listen);

      // Assertions
      expect(kind).toEqual(`Receiving Messages at: `);

      // Complete the Test
      next();
    });
  });

  describe("Log Plugin", () => {
    test("It Returns the plugin name when there is a plugin name", async next => {
      // Setup the Test
      chalk.yellow.mockReturnValue(infoArgs.plugin_name);

      // Run the Test
      const plugin = logger.checkPlugin(infoArgs);

      // Assertions
      expect(plugin).toEqual(infoArgs.plugin_name);
      expect(chalk.yellow).toHaveBeenCalledWith(`(${infoArgs.plugin_name}): `);

      // Complete the Test
      next();
    });

    test("It Returns empty when there is no plugin name", async next => {
      // Run the Test
      const plugin = logger.checkPlugin({});

      // Assertions
      expect(plugin).toEqual("");

      // Complete the Test
      next();
    });
  });

  describe("Log Queue", () => {
    test("It Returns the queue name", async next => {
      // Run the Test
      logger.constructQueue(infoArgs);

      // Assertions
      expect(Object.keys).toHaveBeenCalledWith(infoArgs.pin);

      // Complete the Test
      next();
    });
  });
});
