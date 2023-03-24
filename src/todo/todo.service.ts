import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create(createTodoDto);
  }

  async findAll(completed?: boolean): Promise<Todo[]> {
    if (!completed) {
      return this.todoModel.find().exec();
    } else {
      return this.todoModel.find({ completed });
    }
  }

  async findOne(_id: string): Promise<Todo> {
    return this.todoModel.findOne({ _id: _id }).exec();
  }

  async update(
    _id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoDocument> {
    return this.todoModel.findByIdAndUpdate(_id, updateTodoDto);
  }

  async remove(_id: string) {
    return this.todoModel.findOneAndDelete({ _id: _id }).exec();
  }
}
