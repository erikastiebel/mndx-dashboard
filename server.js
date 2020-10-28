/* eslint no-console: 0 */

const path = require("path");
const express = require("express");
const cors = require("cors");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.config.js");
const MixpanelExport = require("mixpanel-data-export");
const auth = require("http-auth");
const isDeveloping = process.env.NODE_ENV !== "production";
const port = isDeveloping ? 3000 : process.env.PORT;
const basic = auth.basic({
  realm: "Users",
  file: __dirname + "/data/.htpasswd"
});

const app = express();

app.use(auth.connect(basic));

const corsOptions = {
  origin: "http://localhost:3000"
};

const mixpanel = new MixpanelExport({
  api_key: "*************",  //The real api key is removed
  api_secret: "*************"
});

if (isDeveloping && basic) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: "src",
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get("/", function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, "dist/index.html")));
    res.end();
  });
} else {
  app.use(express.static(__dirname + "/dist"));
}


app.get("/api/mixpanel/segmentation", cors(corsOptions), function (req, res) {
  const settings = {
    from_date: req.query.from_date,
    to_date: req.query.to_date,
    event_name: req.query.event_name,
    property_name: req.query.property_name
  };

  mixpanel.segmentation({
    "from_date": settings.from_date,
    "to_date": settings.to_date,
    "event": settings.event_name,
    "on": 'properties["' + settings.property_name + '"]'
  })
  .then(function(data) {
    res.json(data);
  });
});

app.get("/api/mixpanel/2.0/funnels", cors(corsOptions), function (req, res) {
  const settings = {
    funnel_id: req.query.funnel_id,
    interval: req.query.interval
  };

  mixpanel.funnels({
    "funnel_id": settings.funnel_id,
    "interval": 30
  })
  .then(function(data) {
    res.json(data);
  });
});

app.get("/api/mixpanel/2.0/engage", cors(corsOptions), function (req, res) {
  const settings = {

  };
  mixpanel.engage({

  })
  .then(function(data) {
    res.json(data);
  });
});

if (isDeveloping) {
  app.get("*", function response(req, res) {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });
}

app.listen(port, "0.0.0.0", function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.", port, port);
});
