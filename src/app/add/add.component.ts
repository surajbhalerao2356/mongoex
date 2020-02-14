import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm:FormGroup
  todoId;

  constructor(private add:FormBuilder, private apiService: ApiService,private router: Router,private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.activeRoute.params.subscribe(id => {
      this.todoId = this.activeRoute.snapshot.paramMap.get('id'); 
      console.log(this.todoId);
      if(this.todoId == undefined) {
        this.addForm = this.add.group({
          name:['',[Validators.required]],
          address:['',[Validators.required]],
        })
      } else {
        let todoObj = this.apiService.updateThisObj
        this.addForm = this.add.group({
          name:[todoObj.name,[Validators.required]],
          address:[todoObj.address,[Validators.required]],
        })
      }
    // })

 
  }

  addNote(addForm) {
    console.log(addForm.valid);
    console.log(addForm.value.name);
    console.log(addForm.value.address);
    if(this.todoId == undefined) {

    this.apiService.posttodos(addForm.value.name, addForm.value.address).subscribe(data => {
      alert(data.message);
      this.router.navigateByUrl("/show")
    })
  } else {
    let obj = {
      name: addForm.value.name,
      address: addForm.value.address
    }
    this.apiService.puttodos(this.todoId,obj).subscribe(data => {
      alert(data.message);
      this.router.navigateByUrl("/show")
    })
  }
  }
}
