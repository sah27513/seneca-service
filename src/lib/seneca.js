/**
 * @module SenecaConfig
 */
import Seneca from "seneca";
import * as service from "lib/seneca";

/**
 * Method to Configure Seneca Instance
 * @returns {object} -- The Modified Seneca Instance
 * @memberof SenecaConfig
 */
export const config = options => {
  // Create a new Instance of Seneca
  const seneca = new Seneca({
    log: {
      map: [
        {
          level: "all",
          handler: "print"
        }
      ]
    }
  });

  // Load the Seneca Plugins
  service.load(options.transport, { plugins: options.plugins, seneca });

  // Return the Seneca Instance
  return seneca;
};

/**
 * Method to Load Seneca Plugins
 * @param {object} seneca -- The Seneca Instance
 * @returns {object} -- The Modified Seneca Instance
 * @memberof SenecaConfig
 */
export const load = (transport, { plugins, seneca }) => {
  // Use the Transport Plugin
  seneca.use(transport);

  // Load All Plugins
  Object.keys(plugins).map(plugin => seneca.use(plugins[plugin]));

  // Return the Seneca Instance
  return seneca;
};

/**
 * Method to Initialize the Seneca Service
 * @param {object} service -- The Seneca Service
 * @memberof SenecaConfig
 */
export const init = (seneca, pin) => {
  // Listen on the Pin
  seneca.listen(pin);
};

/**
 * Method to Start the Seneca Service
 * @param {object} service -- The Seneca Service
 * @memberof SenecaConfig
 */
export const start = (seneca, pin) => {
  // Initialize the Service when it is ready
  return () => seneca.ready(service.init(seneca, pin));
};

/**
 * Method to Create a Seneca Microservice
 * @param {object} pin -- The Seneca Service
 * @memberof SenecaConfig
 */
export const createService = (pin, options) => {
  // Configure Seneca
  const seneca = service.config(options);

  // Return the Start command
  return { start: service.start(seneca, pin) };
};
