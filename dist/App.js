"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const version = "1.0";
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                name: `Nodelife ${version}`,
                description: 'Simple Game-of-Life microservice written in Typescript/Node.js',
                help: `Refer to ${req.baseUrl}/api for API description`
            });
        });
        router.get('/transition', (req, res) => {
            res.json({
                name: "next"
            });
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map