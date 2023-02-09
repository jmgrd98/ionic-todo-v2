import { Component, OnInit } from '@angular/core';
import { Todo } from '../types/Todo';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { TodoService } from '../services/todo.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../types/User';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  todos: any = {};
  users:any = {};
  user:User = {};
  signUpForm!: FormGroup;
  submittedForm:boolean = false;
  invalidConfirmPassword:boolean = false;
  disabledBtn:boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private todoService: TodoService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {

      this.signUpForm = this.formBuilder.group({
        name: ['', Validators.required]!,
        email: ['', [Validators.required, Validators.email]!],
        password: new FormControl('', [Validators.required, Validators.minLength(6)]!),
        confirmPassword: new FormControl('', [Validators.required, this.validateConfirmPassword]!)
      },
      {
        // validators: this.validateConfirmPassword
      })
  };    

  async ngOnInit() {

      
      this.signUpForm.get('confirmPassword')?.valueChanges.subscribe((value) => {
        console.log(value);

        const password = this.signUpForm.value.password;
        
        if(password && password !== value){
          this.invalidConfirmPassword = true;
          console.log('Senhas diferentes!')
        }

        else if(password && password === value){
          this.disabledBtn = false;
        }
      })

    console.log(this.signUpForm.get('confirmPassword'));
    this.getTodos();
  }

  validateConfirmPassword(otherField:string){
    this.signUpForm.get('confirmPassword')?.valueChanges.subscribe((value) => {
      console.log(value);

      const password = this.signUpForm.value.password;
      
      if(password && password !== value){
        console.log('Senhas diferentes!')
      }
      else if(password && password === value){
        this.disabledBtn = false;
      }
    })

    const validator = (formControl: FormControl) => {
      this.signUpForm.get('confirmPassword')?.valueChanges.subscribe((value) => {
        console.log(value);
  
        const password = this.signUpForm.value.password;
        
        if(password && password !== value){
          console.log('Senhas diferentes!')
        }
      })
    };

  console.log(this.signUpForm.get('confirmPassword'));
  return validator;
  }


  async submitForm(){
    if(this.signUpForm.value.password !== this.signUpForm.value.confirmPassword){
      return alert('Confirm password must be equal')
    }

    this.submittedForm = true;
    this.user.name = this.signUpForm.value.name;
    this.user.email = this.signUpForm.value.email;
    this.user.password = this.signUpForm.value.password;
    
    await this.userService.createUser(this.signUpForm.value);
    
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

 