import { Test, TestingModule } from '@nestjs/testing';
import { Todo } from './schemas/todo.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { getModelToken } from '@nestjs/mongoose';

describe('TodoController', () => {
  let controller: TodoController;
  const mockTodo: Todo = new Todo();
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          providers: [
            TodoService,
            {
              provide: getModelToken(Todo.name),
              useValue: mockTodo,
            },
          ],
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of todos', async () => {
      const result = [
        {
          id: '1',
          name: 'write full stack book',
          completed: false,
        },
      ];
      jest
        .spyOn(todoService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));
      expect(controller.findAll()).toBe(result);
    });
  });
});
