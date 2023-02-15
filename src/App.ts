import * as express from 'express'

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
      res.json({
        name: "next"
      })
    })

    this.express.use('/', router)
  }
}

export default new App().express