import { Component } from '@angular/core';

import { TaskStore } from '../task/task.store';
import { ActiveTaskComponent } from './active-task.component';
import { Task } from '../task/task';

@Component({
    selector: 'active-tasks',
    template: `
    <h2>Active tasks</h2>
    <active-task *ngFor="let task of taskStore.tasks | async"
        [task]="task"
        [class.task-selected]="task === selectedTask"
        (onStart)="onStart($event)"
        (onStop)="onStop($event)"
        (onRemove)="onRemove($event)">
    </active-task>
    `
})
export class ActiveTasksComponent {
    private selectedTask: Task;

    constructor(private taskStore: TaskStore) {
        this.taskStore.loadTodaysTasks();
    }

    onStart(task: Task) {
        this.selectedTask = task;
    }

    onStop(payload: any) {
        this.taskStore.setTaskTime(payload.task._id, payload.seconds);
    }

    onRemove(task: Task) {
        this.taskStore.removeTask(task._id);
    }
}
