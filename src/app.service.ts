import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { main as runDeploy } from '../scripts/new_deploy'


interface IResult {
  response: Response;
  data: unknown
}

interface Conquistas {
  id: number
  createdAt: Date
  updatedAt: Date
  nomeConquista: string
  dataConquista: Date | null
  txHashConquista: string | null
  userId: number
}


@Injectable()
export class AppService {

  constructor(private httpService: HttpService) {}

  async exec(userId: number, token: string) {
    
    try {
      const conquistas = await this.getConquistas(userId)
      const result: IResult = await runDeploy(conquistas, token);
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  async getConquistas(userId: number) {
    try {
      const conquistas = await this.httpService.axiosRef.get(`http://ifdot.com.br:3000/Conquistas/user/${userId}`);
      const data: Conquistas[] = await conquistas.data
      return data
    } catch (err) {
      throw err
    }
  }
}
