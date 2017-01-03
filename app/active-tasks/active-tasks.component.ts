import { Component } from '@angular/core';

import { TaskStore } from '../task/task.store';
import { ActiveTaskComponent } from './active-task.component';

@Component({
    selector: 'active-tasks',
    template: `
    <h2>Active tasks</h2>
    <active-task *ngFor="let task of taskStore.tasks | async"
        [task]="task"
        (onStop)="onStop($event)"
        (onRemove)="onRemove($event)">
    </active-task>
    `
})
export class ActiveTasksComponent {

    constructor(private taskStore: TaskStore) {
        this.taskStore.loadTodaysTasks();
    }

    onStop(payload: any) {
        this.taskStore.setTaskTime(payload.taskId, payload.seconds);
    }

    onRemove(taskId: number) {
        this.taskStore.removeTask(taskId);
    }
}
