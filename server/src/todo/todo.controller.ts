import { Body, Controller, Post, Get, Patch, Delete, Param } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(
        private readonly todoService: TodoService
    ) { }

    @Post()
    todo(@Body() todoDto: TodoDto) {
        return this.todoService.addTodo(todoDto)
    }

    @Get()
    async getAll() {
        const todos = await this.todoService.getTodos();
        return todos;
    }

    @Patch()
    async doneTodo(@Body() todo) {
        console.log('patch', todo)
        await this.todoService.doneTodo(todo);
        return null;
    }

    @Delete(':id')
    async removeTodo(@Param('id') id: number) {
         await this.todoService.removeTodo(id);
        return null;
    }
}
