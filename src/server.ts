import express, { Request, Response, Express } from "express"
import { main } from "../scripts/deploy_carteirinha"
import { ConquistaController } from "./controllers/conquista.controller"

const app: Express = express();

app.listen(3001)

app.get("/oi", (req: Request, res: Response) => {
  return res.status(200).json({ on: "on"})
})

app.use(ConquistaController)

