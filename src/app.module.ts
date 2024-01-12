import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { WeatherModule } from './weather/weather.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    WeatherModule,
    UserModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://melcv:wowjohn7.@wheaterapp.1puk8dj.mongodb.net/wheaterAppDB?retryWrites=true&w=majority',
    ),
    // MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
