import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOkResponse({
    description: 'Busca un usuario por id',
  })
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Actualiza un usuario por id',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updatedUser;
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Elimina un usuario por id',
  })
  async delete(@Param('id') id: string) {
    const deleted = await this.userService.delete(id);
    if (!deleted) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { deleted: true };
  }

  @Get('')
  @ApiOkResponse({
    description: 'Obtiene todos los usuarios',
  })
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }
}
