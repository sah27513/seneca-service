export const senecaInstance = {
  ready: jest.fn(),
  listen: jest.fn(),
  client: jest.fn(),
  use: jest.fn(),
  log: {
    info: jest.fn(),
    error: jest.fn()
  }
};

export const options = {
  transport: "seneca-amqp-transport",
  plugins: {
    examplePlugin: jest.fn()
  }
};

export const pin = {
  type: "amqp",
  url: "amqp://localhost:5672",
  pin: {
    role: "db",
    cmd: "*"
  }
};
