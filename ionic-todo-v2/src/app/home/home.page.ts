import { Component, OnInit } from '@angular/core';
import { Todo } from '../types/Todo';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { TodoService } from '../services/todo.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  todos: any = {};

  constructor(
    private todoService: TodoService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
    }

    async ngOnInit() {
      this.getTodos();
    }

  async getTodos(){
    this.todos =  await this.todoService.getAll();
  }
  async openActions(todo: Todo){
    const actionSheet = await this.actionSheetCtrl.create({
      header: "O que deseja fazer?",
      buttons: [{
        text: todo.completed ? 'Desmarcar' : 'Marcar',
        icon: todo.completed ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          this.todoService.editTodo(todo.id, todo);
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

  async deleteTodo(todo: { id: string; }){
    try{
      await this.todoService.deleteTodo(todo.id);
      this.getTodos();
    }catch(e){
      console.log(e);
    }
  }

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

    let todo = {description: todoTodo, completed: false};
    await this.todoService.createTodo(todo);
    await this.getTodos();
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
 