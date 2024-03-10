const express = require('express');
const proxy = require('express-http-proxy');

const router_api_router = express.Router();
const apiRouterServiceProxy = proxy(`${process.env.API_ROUTER_CONNECTION}`);

router_api_router.post("/routers", (request, response, next) => {
    apiRouterServiceProxy(request, response, next)
});

module.exports = router_api_router;
