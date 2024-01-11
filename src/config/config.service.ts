import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly openWeatherConfig = {
    apiKey: '1df9467668dd9a11b57c3f3d8d16914f',
    defaultUnit: 'metric' as 'metric' | 'standard' | 'imperial', // o 'imperial'
    // Agrega aquí más configuraciones si son necesarias
  };

  get getOpenWeatherConfig() {
    return this.openWeatherConfig;
  }
}