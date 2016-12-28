import { Component } from '@angular/core';

import { TaskStore } from '../task/task.store';

@Component({
    selector: 'task-list',
    template: `
    <h2>Active tasks</h2>
    <ul>
        <li *ngFor="let task of taskStore.tasks | async">
            {{task.name}}
            <button>Start</button>
            <button>Stop</button>
        </li>
    </ul>
    `
})
export class ActiveTasksComponent {

    constructor(private taskStore: TaskStore) {
    }

}
