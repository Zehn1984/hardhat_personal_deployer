import { HttpService, HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common'
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy]
})
export class AppModule {}