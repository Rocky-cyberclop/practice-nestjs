import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entity/project.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.fullName = createUserDto.fullName;
    user.role = createUserDto.role;
    user.activeYn = createUserDto.activeYn;

    const projects = new Array<Project>();
    createUserDto.projects?.map((item) => {
      const project = new Project();
      project.name = item;
      projects.push(project);
    });
    user.projects = projects;

    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new HttpException('User existed', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async find(searchUserDto: SearchUserDto): Promise<User[]> {
    let { projects, ...searchWithNoProject } = searchUserDto;

    let searchOption = {};
    for (const property in searchWithNoProject) {
      searchOption = { ...searchOption, [property]: searchUserDto[property] };
    }
    let users = await this.userRepository.find({
      relations: { projects: true },
      where: searchOption,
    });

    projects = typeof projects === 'string' ? [projects] : projects;
    if (projects && Array.isArray(projects))
      users = users.filter((user) => {
        return projects.every((item) =>
          user.projects.some((project) => {
            return project.name === item;
          }),
        );
      });

    return users;
  }

  async update(username: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: username },
      relations: ['projects'],
    });
    user.fullName = updateUserDto.fullName;
    user.role = updateUserDto.role;
    user.activeYn = updateUserDto.activeYn;

    const projects = new Array<Project>();
    if (updateUserDto.projects) {
      updateUserDto.projects.map((item) => {
        const project = new Project();
        project.name = item;
        projects.push(project);
      });
    }
    user.projects = projects;

    return await this.userRepository.save(user);
  }

  async remove(username: string): Promise<DeleteResult> {
    const user = await this.userRepository.findOne({
      where: { username: username },
      relations: ['projects'],
    });

    if (user.projects)
      user.projects.map((item) => {
        this.projectRepository.delete(item.id);
      });

    return await this.userRepository.delete({ username: username });
  }
}
