import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpService: HttpClient) { }

  public async getTodo(urlContext?:string){

   return this.httpService.get(environment.url).toPromise();
  }

  public async createTodo(urlContext?:string){
    
    return this.httpService.post(environment.url, urlContext).toPromise();
  }

  public async editTodo(urlContext?:string){

    return this.httpService.patch(environment.url, urlContext).toPromise();
  }

  public async deleteTodo(urlContext?:string){

    return this.httpService.delete(environment.url).toPromise();
  }
}
