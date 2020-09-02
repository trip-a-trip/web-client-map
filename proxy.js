const { CommonConfiguration } = require('@solid-soda/config')
const cacheMiddleware = require("http-cache-middleware");
const fastProxy = require("fast-proxy");
const files = require("serve-static");
const restana = require("restana");
const path = require("path");

const config = new CommonConfiguration('./.env')

const serve = files(path.join(__dirname, "..", "public"), {
  lastModified: false,
  setHeaders: (res, path) => {
    res.setHeader("cache-control", "public, no-cache, max-age=604800");
  },
});

const cache = cacheMiddleware();

const { proxy } = fastProxy({
  base: config.getStringOrThrow("CORE_URL"),
});

const gateway = restana();

gateway.use(serve);
gateway.use(cache);

gateway.get("/api/venues", (req, res) => proxy(req, res, "/docs", {}));

gateway.start(config.isProd() ? 80 : 8080);
