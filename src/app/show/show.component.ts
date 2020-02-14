import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Key } from 'protractor';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  todoArray = [];
  searchText;
  num = 0;
  
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getTodosFromService();
  }

  getTodosFromService(){
    this.apiService.gettodos().subscribe(data =>{ 
      this.todoArray = data.todo
    })
  }
  deleteTodo(id) {
    this.apiService.deletetodos(id).subscribe(data => {
      alert(data.message);
      let index = this.todoArray.findIndex(obj => {
        return obj._id == id
      })
      this.todoArray.splice(index,1);
    })
  }

  updateTodo(todo) {
    this.apiService.updateThisObj = todo;
    this.router.navigateByUrl("/add/"+todo._id);
  }

  search()
  {
    this.apiService.searchtodos(this.searchText).subscribe(data => {
      this.todoArray = data.todo;
      
    })
  }
  
  prevtodos(){
    this.num--
     this.apiService.prevtodos(this.num).subscribe(data =>{
       this.todoArray = data.todo;
     })
  }

  nexttodos(){
      this.num++
      this.apiService.nexttodos(this.num).subscribe(data =>{
        this.todoArray = data.todo;
      })
  }
}