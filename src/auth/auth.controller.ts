import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const { username, password } = createUserDto;
      const aux = username;
      if (!username || !password) {
        throw new BadRequestException(
          'Nombre de usuario y contraseña son requeridos',
        );
      }
      const user = await this.userService.createUser(username, password);
      return { id: user._id, username: user.username };
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: CreateUserDto) {
    const { username, password } = loginUserDto;
    if (!username || !password) {
      throw new BadRequestException(
        'Nombre de usuario y contraseña son requeridos',
      );
    }

    try {
      return await this.authService.validateUser(username, password);
    } catch (error) {
      throw error;
    }
  }
}
