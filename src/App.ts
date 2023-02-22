import * as express from 'express'
import { Life } from './Life'

const version = "1.0"

class App {
  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        name: `Nodelife ${version}`,
        description: 'Simple Game-of-Life microservice written in Typescript/Node.js',
        help: `Refer to ${req.baseUrl}/api for API description`
      })
    })

    router.get('/transition', (req, res) => {
      let grid = req.body?.grid || req.query?.grid;
      if (grid == undefined) {
        res.json({
          status: "missing 'grid' parameter",
          message: "pass 'grid' as ?grid=[[0,1,0],[0,1,0],[0,1,0]] or as part of http body"
        })
        return res;
      }
      let mylife = new Life(grid);
      res.json({
        status: "ok",
        grid: mylife.transition(),
      })
    })

    this.express.use('/', router)
  }
}

export default new App().express