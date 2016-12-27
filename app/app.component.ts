import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container-fluid">
      <h1>Task management (while we think of a better title)</h1>
      <current-task></current-task>
      <task-list></task-list>
    </div>
  `,
})
export class AppComponent  { 

}
