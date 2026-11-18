import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from '../model/interface';
import { UuidService } from 'src/app/service/uuid.service'
import { SnakbarService } from "../service/snakbar.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild("todoInput")
  todoInputRef !: ElementRef
  @ViewChild('isCompleted') 
  isCompletedRef!: ElementRef<HTMLInputElement>

  isinEditMode: boolean = false;
  private editId !: string


  todoArr: Itodo[] = [

    {
      todoItem: "HTML",
      todoId: "1",
      isCompleted: true
    },

    {

      todoItem: "NODE",
      todoId: "2",
      isCompleted: false

    },


  ]


  constructor(private _uuidservice: UuidService,
    private _snackBar: SnakbarService

  ) {
    
  }

  


  ngOnInit(): void {

  }

  onAddtodo() {
    let todoobj: Itodo = {
      todoItem: this.todoInputRef.nativeElement.value,
      isCompleted: this.isCompletedRef.nativeElement.value === "yes" ? true : false,
      todoId: this._uuidservice.getuuid()
    }

    this.todoArr.push(todoobj)

    this.todoInputRef.nativeElement.value = " "
    this.isCompletedRef.nativeElement.value = "yes"
    this._snackBar.snackBar("Todo is added successully!!")

  }


  onEdittodo(todo: Itodo) {

    this.todoInputRef.nativeElement.value = todo.todoItem
    this.isCompletedRef.nativeElement.value = todo.isCompleted ? "yes" : "no"
    this.isinEditMode = true
    this.editId = todo.todoId
    


  }


  onUpdatetodo() {
    let getIndex = this.todoArr.findIndex(u => u.todoId === this.editId)

    let updated_obj: Itodo = {
      todoItem: this.todoInputRef.nativeElement.value,
      isCompleted: this.isCompletedRef.nativeElement.value === "yes" ? true : false,
      todoId: this.editId
    }
    this.todoArr[getIndex] = updated_obj

    this.isinEditMode = false

    this.todoInputRef.nativeElement.value = ""
    this.isCompletedRef.nativeElement.value = "yes"
    this._snackBar.snackBar("Todo is update successully!!")


  }


  onDeletetodo(id: string) {

    let ind = this.todoArr.findIndex(d => d.todoId === id)

    this.todoArr.splice(ind, 1)

    this._snackBar.snackBar("Todo is delete successully!!")

  }



  //checkbox

  onUpdatechekbox(todo: Itodo) {
    todo.isCompleted = !todo.isCompleted

    this._snackBar.snackBar("Todo checkbox updeted successully!!")


  }
}
