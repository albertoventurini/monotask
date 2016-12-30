import { Component } from '@angular/core';

import { TaskStore } from '../task/task.store';
import { ActiveTaskComponent } from './active-task.component';

@Component({
    selector: 'active-tasks',
    template: `
    <h2>Active tasks</h2>
    <active-task *ngFor="let task of taskStore.tasks | async"
        [task]="task">
    </active-task>
    `
})
export class ActiveTasksComponent {

    constructor(private taskStore: TaskStore) {
    }

}
