require.config({
  baseUrl: "js",
  paths: {
    "json2": "libs/json2.js",
    "jquery": "libs/jquery",
    "underscore": "libs/underscore",
    "backbone": "libs/backbone",
    "localStorage": "libs/backbone.localStorage"
  },

  shim: {
    "underscore": {
      exports: "_"
    },
    "backbone": {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    }
  }
});

