import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpService: HttpClient) { }

  public async getTodo(urlContext?:string){

   return this.httpService.get(environment.url).toPromise()
  }
}
