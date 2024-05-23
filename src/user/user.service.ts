import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  private users = new Array<UpdateUserDto>();
  create(createUserDto: CreateUserDto): CreateUserDto {
    if (this.users.find(item => {
      return createUserDto.username === item.username;
    }))
      throw new HttpException('Username existed!', HttpStatus.BAD_REQUEST);
    this.users.push(createUserDto);
    return createUserDto;
  }

  find(searchUserDto: SearchUserDto): UpdateUserDto[] {
    if (typeof searchUserDto.projects === 'string')
      searchUserDto.projects = [searchUserDto.projects];
    let resultUsers = new Array<UpdateUserDto>();
    this.users.find((user) => {
      if (this.isAllMatchesSearch(searchUserDto, user)) {
        resultUsers.push(user);
      }
    });
    return resultUsers;
  }

  update(username: string, updateUserDto: UpdateUserDto): UpdateUserDto {
    let updatedUser = this.users.find((user, index) => {
      if (username === user.username) {
        this.users[index] = { ...this.users[index], ...updateUserDto };
        return this.users[index];
      }
    });
    if (!updatedUser)
      throw new HttpException('Username did not exist', HttpStatus.BAD_REQUEST);
    return updateUserDto;
  }

  remove(username: string): string {
    let deletedUser = this.users.find((user, index) => {
      if (username === user.username) {
        return this.users.splice(index, 1);
      }
    });
    if (!deletedUser)
      throw new HttpException('Username did not exist', HttpStatus.BAD_REQUEST);
    return `This action removes user ${username}`;
  }

  /**
   * This function will loops through all properties in 'searchDto' to check on every sinlge user 'existed'
   * @param search 
   * @param existed 
   * @returns true if all properties in searchDto matches, otherwise false
   */
  isAllMatchesSearch(search: SearchUserDto, existed: UpdateUserDto): boolean {
    const { projects, ...searchWithNoProject } = search;
    for (const property in searchWithNoProject) {
      if (search[property] !== existed[property]) return false;
    }
    if (Array.isArray(projects) && projects.every(item => typeof item === 'string'))
      if (!projects.every(item => existed.projects.includes(item)))
        return false;
    return true;
  }
}
