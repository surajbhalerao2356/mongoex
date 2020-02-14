import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { ShowComponent } from './show/show.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import { NxgPaginationModule } from 'nxg-pagination';

@NgModule({

  declarations: [
    AppComponent,
    AddComponent,
    ShowComponent
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
   //NxgPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
