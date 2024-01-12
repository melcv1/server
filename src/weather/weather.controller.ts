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

/**
 * @description Weather Controller for handling weather-related requests.
 */

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

   /**
   * Get current weather for a city.
   * @param {WeatherDto} query - Query parameters including the city name.
   * @returns {Promise<any>} - Current weather data.
   */
  @Get('/current')
  @ApiOkResponse({ description: 'Obtiene el clima actual para una ciudad.' })
  async getCurrentWeather(@Query() query: WeatherDto): Promise<any> {
    try {
      return await this.weatherService.getCurrentWeather(query.city);
    } catch (error) {
      throw new HttpException(
        'Error while getting current weather',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Get air pollution data for a city.
   * @param {WeatherDto} query - Query parameters including the city name.
   * @returns {Promise<any>} - Air pollution data.
   */
  @Get('/air')
  @ApiOkResponse({ description: 'Get Air Pollution Data' })
  async getAirPollution(@Query() query: WeatherDto): Promise<any> {
    try {
      return await this.weatherService.getAirPollution(query.city);
    } catch (error) {
      throw new HttpException(
        'Error while getting air pollution data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

   /**
   * Get forecasted air pollution data for a city.
   * @param {WeatherDto} query - Query parameters including the city name.
   * @returns {Promise<any>} - Forecasted air pollution data.
   */

  @Get('/air/forecast')
  @ApiOkResponse({ description: 'Get Forecastes AirPollution data' })
  async getAirPollutionForecast(@Query() query: WeatherDto): Promise<any> {
    try {
      return await this.weatherService.getAirPollutionForecasted(query.city);
    } catch (error) {
      throw new HttpException(
        'Error while getting forecasted air pollution data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

   /**
   *Get weather forecast for a city.
   * @param {ForecastDto} query - Query parameters including the city name.
   * @returns {Promise<any>} - Forecasted air pollution data.
   */

  @Get('/forecast')
  @ApiOkResponse({
    description: 'Get weather forecast for a city.',
  })
  async getForecast(@Query() query: ForecastDto): Promise<any> {
    try {
      return await this.weatherService.getForecast(query.city);
    } catch (error) {
      throw new HttpException(
        'Error while getting weather forecast',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


    /**
   *Get weather forecast for a city.
   * @param {ForecastDto} query - Query parameters including the city name.
   * @returns {Promise<any>} - Forecasted air pollution data.
   */

  @Get('/forecast/date')
  @ApiOkResponse({
    description: 'Get weather forecast for a specific date.',
  })
  async getForecastByDate(@Query() query: ForecastDto): Promise<any> {
    try {
      return await this.weatherService.getForecastByDate(
        query.city,
        query.date,
      );
    } catch (error) {
      throw new HttpException(
        'Error while getting forecast by date',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

    /**
   *Get weather forecast for a specific date and day.
   * @param {ForecastDto} query - Query parameters including the city name.
   * @returns {Promise<any>} - Forecasted air pollution data.
   */

  @Get('/forecast/date/day')
  @ApiOkResponse({
    description: 'Get weather forecast for a specific date and day.',
  })
  async getForecastByDateDay(@Query() query: ForecastDto): Promise<any> {
    try {
      return await this.weatherService.getForecastByDateDay(
        query.city,
        query.date,
      );
    } catch (error) {
      throw new HttpException(
        'Error while getting forecast by date and day',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  
    /**
   *Get hourly weather forecast for a specific date.
   * @param {ForecastDto} query - Query parameters including the city name.
   * @returns {Promise<any>} - Forecasted air pollution data.
   */

  @Get('/forecast/hourly')
  @ApiOkResponse({
    description: 'Get hourly weather forecast for a specific date.',
  })
  async getHourlyForecast(@Query() query: ForecastDto): Promise<any> {
    try {
      return await this.weatherService.getHourlyForecast(
        query.city,
        query.date,
      );
    } catch (error) {
      throw new HttpException(
        'Error while getting hourly forecast',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
    /**
   *Get the forecast for the next 5 days starting from a given date.
   * @param {ForecastDto} query - Query parameters including the city name.
   * @returns {Promise<any>} - Forecasted air pollution data.
   */
  @Get('/forecast/nextDays')
  @ApiOkResponse({ description: 'Get the forecast for the next 5 days starting from a given date.' })
  async getNextFiveDaysForecast(@Query() query: ForecastDto): Promise<any> {
    try {
      return await this.weatherService.getNextFiveDaysForecast(query.city, query.date);
    } catch (error) {
      throw new HttpException('Error while getting the forecast for the next 5 days', HttpStatus.BAD_REQUEST);
    }
  }
  
}
