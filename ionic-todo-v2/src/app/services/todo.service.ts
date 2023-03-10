import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Todo } from '../types/Todo';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  todos: any;
  constructor(private httpService: HttpClient) { }

  public async getAll(){
    return this.httpService.get(environment.urlTodo).toPromise();
   }

  public async getTodo(id:string){

   return this.httpService.get(environment.urlTodo+id).toPromise();
  }

  public async createTodo(todo:Todo){
    
    return this.httpService.post(environment.urlTodo, todo).toPromise();
  }

  public async editTodo(id:any, todo:Todo){

    todo.completed = !todo.completed;

    return this.httpService.patch(environment.urlTodo+`/${id}`, todo).toPromise();
  }

  public async deleteTodo(id:string){

    return this.httpService.delete(environment.urlTodo+`/${id}`).toPromise();
  }

}
