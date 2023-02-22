"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Life_1 = require("./Life");
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
            var _a, _b;
            let grid = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.grid) || ((_b = req.query) === null || _b === void 0 ? void 0 : _b.grid);
            if (grid == undefined) {
                res.json({
                    status: "missing 'grid' parameter",
                    message: "pass 'grid' as ?grid=[[0,1,0],[0,1,0],[0,1,0]] or as part of http body"
                });
                return res;
            }
            let mylife = new Life_1.Life(grid);
            res.json({
                status: "ok",
                grid: mylife.transition(),
            });
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map