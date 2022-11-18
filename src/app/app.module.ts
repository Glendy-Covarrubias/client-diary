import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import {MatTableModule } from '@angular/material/table';


import { AppComponent } from './app.component';
import { TableComponent } from './components/generals/table/table.component';
import { DiaryComponent } from './components/diary/diary.component';



@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DiaryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
