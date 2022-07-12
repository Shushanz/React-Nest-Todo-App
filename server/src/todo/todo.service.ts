import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoModel } from './todo.model';
import { Model } from 'mongoose';


@Injectable()
export class TodoService {
    constructor(
        @InjectModel('Todo') private readonly todoModel: Model<TodoModel>
    ) { }

    async addTodo(singleTodo) {
        console.log('singleTodo', singleTodo)
        const newTodo = new this.todoModel({
            id: singleTodo.id,
            title: singleTodo.title,
            done: singleTodo.done
        }
        );
        const result = await newTodo.save();
        console.log('rr', result)
    }

    async getTodos() {
        const todos = await this.todoModel.find();
        return todos as TodoModel[];
    }

    async doneTodo(todo) {
        console.log('serv', todo)
        const updatedTodo = await this.findTodo(todo._id);
        console.log('updated', updatedTodo)
        updatedTodo.done = todo.done;
        updatedTodo.save();
    }

    async removeTodo(id: number) {
        const result = await this.todoModel.deleteOne({id: id}).exec();
    }

    private async findTodo(id: number): Promise<TodoModel> {
        let todo;
        try {
            todo = await this.todoModel.findById(id).exec();
            console.log('f', todo)
        } catch (error) {
            throw new NotFoundException('didnt find todo');
        }
        if (!todo) {
            throw new NotFoundException('didnt find todo');
        }
        console.log(todo)
        return todo;
    }
}