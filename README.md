![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

> Utility for managing Seneca Microservices

# seneca-service

Lead Maintainer: [Stephen Halliburton](mailto:sah27513@gmail.com)

---

[![npm version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Support](#support)
- [License](#license)

---

## Installation

```shell
$ npm i -S seneca-service
```

---

## Features

- Create Messaging/RESTful Seneca Microservices
- Attach any number of custom plugins onto the Service
- Specify different messaging systems to use (_default: AMQP 0-9-1_)

---

## Usage

The most basic usage of this package is to create a service listener on a particular pin, e.g.: `createService(PIN, options)`.

**PIN:**

> Type
> The type of Messaging that will be used by the service (_default AMQP 0-9-1_)
> url
> The URL or connection string for the messaging system that is being used
> pin
> The pattern that the service will listen on and respond with different actions

**Options:**

> serviceType
> The type of Service being created (_'client' or 'listener'_)
> plugins
> The list of plugins that will be used by this service (i.e. a set of actions for a given pattern)
> clients (optional)
> A list of other services that this service is a client to (i.e. can send/receive messages)

```javascript
// Import the Package
import { createService } from "seneca-service";

// Assuming you have a plugins directory where you export your plugins
import plugins from "./plugins";

// Create a Service
const service = createService(
  {
    type: "amqp",
    url: "AMQP_CONNECTION_STRING",
    pin: {
      role: "db",
      cmd: "*"
    }
  },
  {
    serviceType: "client",
    plugins
  }
);

// Start the Service
service.start();
```

---

## Tests

- To run the unit test: `npm test`

---

## Support

Reach out to me at the following:

- Email at <a href="mailto:sah27513@gmail.com" target="_blank">sah27513@gmail.com</a>

---

## License

MIT © [stephen halliburton]()

[npm-image]: https://badge.fury.io/js/npm.svg
[npm-url]: https://badge.fury.io/js/npm
[travis-image]: https://travis-ci.com/sah27513/seneca-service.svg?branch=master
[travis-url]: https://travis-ci.com/sah27513/seneca-service
[daviddm-image]: https://david-dm.org/sah27513/seneca-service.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/sah27513/seneca-service
[coveralls-image]: https://coveralls.io/repos/github/sah27513/seneca-service/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/sah27513/seneca-service?branch=masterg&service=github
