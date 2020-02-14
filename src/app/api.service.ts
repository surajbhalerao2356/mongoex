import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  updateThisObj;
  constructor(private http: HttpClient) { }

  gettodos (){
    return this.http.get<{message: string, todo: []}>("http://localhost:3000/api/todos")
  }

  puttodos (id,obj){
    return this.http.put<{message: string}>("http://localhost:3000/api/updatetodo/"+id,obj)
  }

  posttodos (name,address){
    let obj={
      name:name,
      address:address
    }
    return this.http.post<{message: string}>("http://localhost:3000/api/createTodo",obj)
  }

  deletetodos (id){
    return this.http.delete<{message: string}>("http://localhost:3000/api/deletePost/"+id)
  }  

  searchtodos(searchText){
    return this.http.get<{message: string, todo: []}>("http://localhost:3000/api/search/"+searchText)
  }

  prevtodos(num){
     return this.http.get<{message: string, todo: []}>("http://localhost:3000/api/prev/"+num)
  }

  nexttodos(num){
    return this.http.get<{message: string, todo: []}>("http://localhost:3000/api/next/"+num)
  }
}