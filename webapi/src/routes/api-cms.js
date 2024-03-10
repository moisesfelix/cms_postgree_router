const express = require('express');
const proxy = require('express-http-proxy');

const router_api_cms = express.Router();
const apiCMSServiceProxy = proxy(`${process.env.API_CMS_CONNECTION}`);

router_api_cms.get("/users", (request, response, next) => {
    apiCMSServiceProxy(request, response, next)
});
router_api_cms.post("/users", (request, response, next) => {
    apiCMSServiceProxy(request, response, next)
});
router_api_cms.put("/users/:id", (request, response, next) => {
    apiCMSServiceProxy(request, response, next)
});
router_api_cms.delete("/users/:id", (request, response, next) => {
    apiCMSServiceProxy(request, response, next)
});

module.exports = router_api_cms;
