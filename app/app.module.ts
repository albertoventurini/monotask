import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { TaskListComponent } from './task-list.component';
import { CurrentTaskComponent } from './current-task.component';
import { ClockComponent } from './clock.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, TaskListComponent, CurrentTaskComponent, ClockComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
