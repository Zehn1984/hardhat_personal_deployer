import { Controller, Post, UseGuards, Request } from "@nestjs/common"
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";

export interface IRequestWithContentToken extends Request {
  user: {
    id: number,
    isAdmin: boolean
    iat: number,
    exp: number
  },
}

export interface IReqToken{
  headers: {
    authorization: string
  }
}

@Controller()
export class AppController {

  constructor(private AppService: AppService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async deployConquistas(@Request() req: IRequestWithContentToken  & IReqToken) {
    const { id } = req.user;
    const token = req.headers.authorization;
    return await this.AppService.exec(id, token)
  };
}