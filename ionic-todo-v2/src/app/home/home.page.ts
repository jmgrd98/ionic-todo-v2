import { Component } from '@angular/core';
import { Todo } from '../types/Todo';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todos: Todo[] = []

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

    }

  async openActions(todo: Todo){
    const actionSheet = await this.actionSheetCtrl.create({
      header: "O que deseja fazer?",
      buttons: [{
        text: todo.done ? 'Desmarcar' : 'Marcar',
        icon: todo.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          todo.done = !todo.done;
          this.updateLocalStorage();
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
    this.todos = this.todos.filter(todoArray => todo != todoArray)
  }

  updateLocalStorage(){
    localStorage.setItem('todosDb', JSON.stringify(this.todos))
  }

  async addTodo(todo: string){
    if(todo.trim().length < 1){
      const toast = await this.toastCtrl.create({
        message: 'Informe o seu todo'
      })
    }
  }

  async showAdd(){
    const alert = await this.alertCtrl.create({
      header: 'Write your todo below',
      cssClass: 'alertModal',
      buttons: [
        {
          text: 'Add todo!',
          handler: (form) => {
            // this.addTodo(form.todo)
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
          name: 'todoInput',
          type: 'text',
          placeholder: "What you're gonna do?",
        }
      ]
    })
    await alert.present()
  }

}
 