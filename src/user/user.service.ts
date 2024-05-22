import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users = new Array<CreateUserDto>();
  create(createUserDto: CreateUserDto): CreateUserDto {
    this.users.push(createUserDto)
    return createUserDto;
  }

  find(searchUserDto: UpdateUserDto): CreateUserDto[] {
    let resultUsers = new Array<CreateUserDto>();
    this.users.find((user) => {
      if (searchUserDto.username === user.username) {
        resultUsers.push(user)
      }
    });
    return resultUsers;
  }

  update(username: string, updateUserDto: UpdateUserDto): UpdateUserDto {
    return updateUserDto;
  }

  remove(username: string) {
    return `This action removes a ${username} user`;
  }
}
