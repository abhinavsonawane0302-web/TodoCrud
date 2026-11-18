import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istd } from '../model/interface.std';
import { UuidService } from 'src/app/service/uuid.service'
import { SnakbarService } from "../service/snakbar.service";


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {



  @ViewChild("fname") fnameRef!: ElementRef
  @ViewChild("lname") lnameRef!: ElementRef
  @ViewChild("email") emailRef!: ElementRef
  @ViewChild("contact") contactRef!: ElementRef
  @ViewChild("isActive") isActiveRef!: ElementRef



  isInEditMode: boolean = false;

  updateId! : string

  studentArr: Istd[] = [

    { id: "1", fname: 'Sagar', lname: 'Chavan', email: 'sagar.chavan@gmail.com', contact: 9876543222, isActive: true },
    { id: "2", fname: 'Riya', lname: 'Mishra', email: 'riya.mishra@gmail.com', contact: 9876543223, isActive: true },
    { id: "3", fname: 'Nikhil', lname: 'Gaikwad', email: 'nikhil.gaikwad@gmail.com', contact: 9876543224, isActive: false }
  ]

  constructor(private _uuidservice: UuidService,
    private _snackBar: SnakbarService

  ) {

  }

  ngOnInit(): void {

  }


  onAddstd() {
    let stdobj: Istd = {
      id: this._uuidservice.getuuid(),
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      contact: +this.contactRef.nativeElement.value,
      isActive: this.isActiveRef.nativeElement.value === 'active'
    }

    this.studentArr.push(stdobj)

    this.onReset()

     this._snackBar.snackBar("Student is added successully!!")
  }


  onEditStd(std: Istd) {
    this.fnameRef.nativeElement.value = std.fname;
    this.lnameRef.nativeElement.value = std.lname;
    this.emailRef.nativeElement.value = std.email;
    this.contactRef.nativeElement.value = std.contact;
    this.isActiveRef.nativeElement.value = std.isActive ? 'active' : 'deactive';

    this.isInEditMode = true;

    this.updateId = std.id;
  }


  onUpdatestd() {
    let updateObj : Istd = {
      id: this.updateId,
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      contact: +this.contactRef.nativeElement.value,
      isActive: this.isActiveRef.nativeElement.value === 'active'
    }

    const getInd = this.studentArr.findIndex(u => u.id === this.updateId)

    this.studentArr[getInd] = updateObj;

    this.onReset();

    this._snackBar.snackBar("Student is updated successully!!")

  }


  onDeleteStd(id: string) {
    const index = this.studentArr.findIndex(d => d.id === id)

    this.studentArr.splice(index, 1)

    this._snackBar.snackBar("Student is deleted successully!!")
  }

  onUpdateChekbox(std: Istd) {
    std.isActive = !std.isActive;

    this._snackBar.snackBar("Student checkbox updated successully!!")

  }

  onReset() {
    this.fnameRef.nativeElement.value = '';
    this.lnameRef.nativeElement.value = '';
    this.emailRef.nativeElement.value = '';
    this.contactRef.nativeElement.value = '';
    this.isActiveRef.nativeElement.value = '';


    this.isInEditMode = false
  }
}

