import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: any;
  constructor(private httpService: HttpClient) { }

  public async getAll(){
    return this.httpService.get(environment.urlUser).toPromise();
  }

  public async getUser(id:string){
    return this.httpService.get(environment.urlUser+id).toPromise();
  }

  public async createUser(user:User){
    return this.httpService.post(environment.urlUser, user).toPromise();
  }

  public async editUser(id:string, user:User){
    return this.httpService.patch(environment.urlUser+`/${id}`, user).toPromise();
  }

  public async deleteUser(id:string){
    return this.httpService.delete(environment.urlUser+`/${id}`).toPromise();
  }
}
