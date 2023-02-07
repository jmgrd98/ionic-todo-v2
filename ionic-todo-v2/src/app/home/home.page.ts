import { Component } from '@angular/core';
import { Todo } from '../types/Todo';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { TodoService } from '../services/todo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
      // let todosJson = localStorage.getItem('todosDb');
      // if(todosJson != null){
      //   this.todos = JSON.parse(todosJson);
      // }

      const todos = this.todoService.getTodo('');
      console.log(todos)
    }

  async openActions(todo: Todo){
    const actionSheet = await this.actionSheetCtrl.create({
      header: "O que deseja fazer?",
      buttons: [{
        text: todo.completed ? 'Desmarcar' : 'Marcar',
        icon: todo.completed ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          todo.completed = !todo.completed;
          // this.updateLocalStorage();
        },
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked')
        }
      }
    ]
    })
    await actionSheet.present()
  }

  deleteTodo(todo:Todo){
    this.todos = this.todos.filter(todoArray => todo != todoArray);
    // this.updateLocalStorage();
  }

  // updateLocalStorage(){
  //   localStorage.setItem('todosDb', JSON.stringify(this.todos));
  // }

  async addTodo(todoTodo: string){
    if(todoTodo.trim().length < 1){
      const toast = await this.toastCtrl.create({
        message: 'Informe o seu todo',
        duration: 2000,
        position: 'top'
      })
      toast.present();
      return;
    }

    console.log(todoTodo)

    // this.todo.createTodo(environment.url)

    let todo = {description: todoTodo, completed: false};
    this.todos.push(todo);
    // this.updateLocalStorage();
  }

  async showAdd(){
    const alert = await this.alertCtrl.create({
      header: 'Write your todo below',
      cssClass: 'alertModal',
      buttons: [
        {
          text: 'Add todo!',
          handler: (form) => {
            this.addTodo(form.todoTodo);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancelBtn',
        }
      ],
      inputs: [
        {
          name: 'todoTodo',
          type: 'text',
          placeholder: "What you're gonna do?",
        }
      ]
    })
    await alert.present()
  }
}
 