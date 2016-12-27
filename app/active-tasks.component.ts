import { Component } from '@angular/core';

import { TaskStore } from './task.store';

@Component({
    selector: 'task-list',
    template: `
    <h2>Active tasks</h2>
    <ul>
    <!--
        <li *ngFor="let task in taskStore.tasks | async">
            {{task.name}}
        </li>
        -->
    </ul>
    `
})
export class ActiveTasksComponent {

}
