import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  async findAll(@Query('completed') completed?: boolean) {
    return this.todoService.findAll(completed);
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    return this.todoService.findOne(_id);
  }

  @Put(':id')
  async update(@Param('id') _id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(_id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') _id: string) {
    return this.todoService.remove(_id);
  }
}
