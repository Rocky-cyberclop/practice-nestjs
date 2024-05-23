import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('insert')
  create(@Body() createUserDto: CreateUserDto): CreateUserDto {
    return this.userService.create(createUserDto);
  }

  @Get('search')
  find(@Query() query: SearchUserDto): UpdateUserDto[] {
    return this.userService.find(query);
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto): UpdateUserDto {
    return this.userService.update(username, updateUserDto);
  }

  @Delete(':username')
  remove(@Param('username') username: string): string {
    return this.userService.remove(username);
  }
}
