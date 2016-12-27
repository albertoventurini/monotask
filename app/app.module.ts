import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ActiveTasksComponent } from './active-tasks.component';
import { NewTaskComponent } from './new-task.component';
import { ClockComponent } from './clock.component';
import { TaskStore } from './task.store';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, ActiveTasksComponent, NewTaskComponent, ClockComponent ],
  bootstrap: [ AppComponent ],
  providers: [ TaskStore ]
})
export class AppModule { 
}
