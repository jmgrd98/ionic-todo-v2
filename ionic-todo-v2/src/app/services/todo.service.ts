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
    return this.httpService.get(environment.url).toPromise();
   }

  public async getTodo(urlContext?:string){

   return this.httpService.get(environment.url).toPromise();
  }

  public async createTodo(todo:Todo){
    
    return this.httpService.post(environment.url, todo).toPromise();
  }

  public async editTodo(id:string, todo:Todo){

    return this.httpService.patch(environment.url+`/${id}`, todo).toPromise();
  }

  public async deleteTodo(id:string){
    return this.httpService.delete(environment.url+`/${id}`).toPromise();
  }

}
