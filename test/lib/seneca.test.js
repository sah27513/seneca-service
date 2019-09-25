import * as senecaConfig from "lib/seneca";
import * as Seneca from "seneca";

// Mock Modules
jest.mock("seneca");

// Import Mock Data
import { senecaInstance, options, pin } from "test/data";

describe("Seneca Configuration", () => {
  beforeEach(() => {
    jest.spyOn(senecaConfig, "load");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("It Sets Default Options for Seneca", async next => {
    // Setup the test
    Seneca.mockImplementation(() => {
      return senecaInstance;
    });

    // Run the Test
    senecaConfig.config(options);

    // Assertions
    expect(Seneca).toHaveBeenCalled();
    expect(senecaConfig.load).toHaveBeenCalledWith(options.transport, {
      plugins: options.plugins,
      seneca: senecaInstance
    });

    // Complete the Test
    next();
  });

  test("It Initializes the Seneca Service", async next => {
    // Run the Test
    senecaConfig.init(senecaInstance, pin);

    // Assertions
    expect(senecaInstance.listen).toHaveBeenCalledWith(pin);

    // Complete the Test
    next();
  });

  test("It Loads Seneca Plugins", async next => {
    // Run the Test
    senecaConfig.load(options.transport, {
      plugins: options.plugins,
      seneca: senecaInstance
    });

    // Assertions
    expect(senecaInstance.use).toHaveBeenCalledWith(options.transport);
    Object.keys(options.plugins).map(plugin =>
      expect(senecaInstance.use).toHaveBeenCalledWith(options.plugins[plugin])
    );

    // Complete the Test
    next();
  });

  test("It Pre-Loads a Start Command", async next => {
    // Setup the Test
    const start = senecaConfig.start(senecaInstance, pin);

    // Run the Test
    start();

    // Assertions
    expect(senecaInstance.ready).toHaveBeenCalledWith(
      senecaConfig.init(senecaInstance, pin)
    );

    // Complete the Test
    next();
  });

  test("It Can Create a Seneca Service", async next => {
    // Setup the test
    jest.spyOn(senecaConfig, "config").mockReturnValue(senecaInstance);

    // Run the Test
    const service = senecaConfig.createService(pin, options);

    // Assertions
    expect(senecaConfig.config).toHaveBeenCalledWith(options);
    expect(service).toEqual(
      expect.objectContaining({
        start: expect.any(Function)
      })
    );

    // Complete the Test
    next();
  });
});
