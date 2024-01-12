import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dto/weather.dto';
import { ForecastDto } from './dto/forecast.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/current')
  @ApiOkResponse({ description: 'Obtiene el clima actual para una ciudad.' })
  async getCurrentWeather(@Query() query: WeatherDto): Promise<any> {
    try {
      return await this.weatherService.getCurrentWeather(query.city);
    } catch (error) {
      throw new HttpException(
        'Error al obtener el clima actual',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('/air')
  @ApiOkResponse({ description: 'Obtiene AirPollution' })
  async getAirPollution(@Query() query: WeatherDto): Promise<any> {
    try {
      return await this.weatherService.getAirPollution(query.city);
    } catch (error) {
      throw new HttpException(
        'Error al obtener el clima actual',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('/air/forecast')
  @ApiOkResponse({ description: 'Obtiene Forecast AirPollution' })
  async getAirPollutionForecast(@Query() query: WeatherDto): Promise<any> {
    try {
      return await this.weatherService.getAirPollutionForecasted(query.city);
    } catch (error) {
      throw new HttpException(
        'Error al obtener el clima actual',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/forecast')
  @ApiOkResponse({
    description: 'Obtiene el pronóstico del clima para una ciudad.',
  })
  async getForecast(@Query() query: ForecastDto): Promise<any> {
    try {
      return await this.weatherService.getForecast(query.city);
    } catch (error) {
      throw new HttpException(
        'Error al obtener el pronóstico del clima',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/forecast/date')
  @ApiOkResponse({
    description: 'Obtiene el pronóstico del clima para un día específico.',
  })
  async getForecastByDate(@Query() query: ForecastDto): Promise<any> {
    try {
      return await this.weatherService.getForecastByDate(
        query.city,
        query.date,
      );
    } catch (error) {
      throw new HttpException(
        'Error al obtener el pronóstico por fecha',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/forecast/date/day')
  @ApiOkResponse({
    description: 'Obtiene el pronóstico del clima para un día específico.',
  })
  async getForecastByDateDay(@Query() query: ForecastDto): Promise<any> {
    try {
      return await this.weatherService.getForecastByDateDay(
        query.city,
        query.date,
      );
    } catch (error) {
      throw new HttpException(
        'Error al obtener el pronóstico por fecha',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  

  @Get('/forecast/hourly')
  @ApiOkResponse({
    description: 'Obtiene el pronóstico del clima para un día específico.',
  })
  async getHourlyForecast(@Query() query: ForecastDto): Promise<any> {
    try {
      return await this.weatherService.getHourlyForecast(
        query.city,
        query.date,
      );
    } catch (error) {
      throw new HttpException(
        'Error al obtener el pronóstico por hora',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('/forecast/nextDays')
  @ApiOkResponse({ description: 'Obtiene el pronóstico para los próximos 5 días a partir de una fecha dada.' })
  async getNextFiveDaysForecast(@Query() query: ForecastDto): Promise<any> {
    try {
      return await this.weatherService.getNextFiveDaysForecast(query.city, query.date);
    } catch (error) {
      throw new HttpException('Error al obtener el pronóstico para los próximos 5 días', HttpStatus.BAD_REQUEST);
    }
  }
  
}
