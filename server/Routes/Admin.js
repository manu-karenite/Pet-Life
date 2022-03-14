const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");

const express = require("express");
const app = express();
const AdminJSMongoose = require("@adminjs/mongoose");
AdminJS.registerAdapter(AdminJSMongoose);
const adminJs = new AdminJS({
  databases: [],
  rootPath: "/admin",
});

const router = AdminJSExpress.buildRouter(adminJs);
module.exports = router;
