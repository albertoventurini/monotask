import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ActiveTasksComponent } from './active-tasks/active-tasks.component';
import { ActiveTaskComponent } from './active-tasks/active-task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskStore } from './task/task.store';
import { SecondsToHhMmSsPipe } from './utils/secondsToHhMmSs.pipe';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [
    AppComponent,
    ActiveTasksComponent,
    ActiveTaskComponent,
    NewTaskComponent,
    SecondsToHhMmSsPipe
  ],
  bootstrap: [ AppComponent ],
  providers: [ TaskStore ]
})
export class AppModule { 
}
