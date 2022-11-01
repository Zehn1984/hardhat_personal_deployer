import { Router, Request, Response } from "express"
import { main } from "../../scripts/deploy_carteirinha";

const conquistaRouter = Router();

export class Controller {
  constructor(private req, private res) {}
  
  async cadastrarConquistas() {
    const conquistasCadastradas = await main();
    return this.res.status(200).json(conquistasCadastradas)
  }
}

export const ConquistaController = async (req: Request, res: Response) => {
  return await new Controller(req, res).cadastrarConquistas()
}


conquistaRouter.post('/hello', ConquistaController)