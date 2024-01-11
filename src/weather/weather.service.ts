import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import OpenWeatherAPI from 'openweather-api-node';
import { format, addDays, startOfDay,isSameDay   } from 'date-fns';

@Injectable()
export class WeatherService {
  private weatherAPI: OpenWeatherAPI;

  constructor(private configService: ConfigService) {
    const { apiKey, defaultUnit } = this.configService.getOpenWeatherConfig;
    this.weatherAPI = new OpenWeatherAPI({
      key: apiKey,
      units: defaultUnit,
    });
  }

  async getCurrentWeather(city: string): Promise<any> {
    try {
      this.weatherAPI.setLocationByName(city);
      const currentWeather = await this.weatherAPI.getCurrent();
      const location = await this.weatherAPI.getLocation();
      return { ...currentWeather, ...location };
      
    } catch (error) {
      throw new HttpException('Error al obtener el clima actual', HttpStatus.BAD_REQUEST);
    }
  }
  async getAirPollution(city: string): Promise<any> {
    try {
      this.weatherAPI.setLocationByName(city);
      return await this.weatherAPI.getCurrentAirPollution();
    } catch (error) {
      throw new HttpException('Error al obtener el clima actual', HttpStatus.BAD_REQUEST);
    }
  }

  async getForecast(city: string): Promise<any> {
    try {
      this.weatherAPI.setLocationByName(city);
      return await this.weatherAPI.getForecast();
    } catch (error) {
      throw new HttpException('Error al obtener el pronóstico del clima', HttpStatus.BAD_REQUEST);
    }
  }

  async getForecastByDate(city: string, date: string): Promise<any> {
    try {
      this.weatherAPI.setLocationByName(city);
      const forecastData = await this.weatherAPI.getForecast();
  
       // Filtrar los datos para obtener el pronóstico para la fecha solicitada
      
       const filteredData = forecastData.filter(item => {
         const itemDate = new Date(item.dt);
         return itemDate.toISOString().startsWith(date);
       });
  
      return filteredData;
    } catch (error) {
      throw new HttpException('Error al obtener el pronóstico por fecha', HttpStatus.BAD_REQUEST);
    }
  }

  async getHourlyForecast(city: string, date: string): Promise<any> {
    try {
      this.weatherAPI.setLocationByName(city);
      const forecastData = await this.weatherAPI.getForecast();
  
    
      const hourlyData = forecastData.filter(item => {
        const itemDate = new Date(item.dt);
        return itemDate.toISOString().startsWith(date);
      });
  
      // Seleccionar solo 5 datos y formatear la hora
      const formattedData = hourlyData.slice(0, 5).map(item => {
        const formattedTime = format(new Date(item.dt), 'p'); // 'p' es para formato de hora
        return { ...item, time: formattedTime };
      });
  
      return formattedData;
    } catch (error) {
      throw new HttpException('Error al obtener el pronóstico horario', HttpStatus.BAD_REQUEST);
    }
    
  }
  async getNextFiveDaysForecast(city: string, startDate: string): Promise<any> {
    try {
      this.weatherAPI.setLocationByName(city);
      const forecastData = await this.weatherAPI.getForecast();
      const startDateObj = startOfDay(new Date(startDate));

      const nextFiveDaysForecast = [];
      for (let i = 1; i <= 5; i++) {
        const targetDate = addDays(startDateObj, i);
        const forecastForDay = forecastData.find(item => {
          const itemDate = new Date(item.dt);
          return isSameDay(itemDate, targetDate);
        });

        if (forecastForDay) {
          nextFiveDaysForecast.push({
            ...forecastForDay,
            formattedDay: format(targetDate, 'E') // E.g., Mon, Tue, etc.
          });
        }
      }

      return nextFiveDaysForecast;
    } catch (error) {
      throw new HttpException('Error al obtener el pronóstico para los próximos 5 días', HttpStatus.BAD_REQUEST);
    }
  }

  
    

}
