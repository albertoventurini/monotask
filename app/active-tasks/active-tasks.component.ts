import { Component, ViewChildren, QueryList } from '@angular/core';

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
    @ViewChildren(ActiveTaskComponent) private activeTasks: QueryList<ActiveTaskComponent>;

    private selectedTask: Task;

    constructor(private taskStore: TaskStore) {
        this.taskStore.loadTodaysTasks();
    }

    onStart(task: Task) {
        this.stopActiveTask();
        this.selectedTask = task;
    }

    private stopActiveTask() {
        let currentActiveTask = this.activeTasks.find(at => at.task === this.selectedTask);
        if(currentActiveTask) {
            currentActiveTask.stop();
        }
    }

    onStop(payload: any) {
        this.taskStore.setTaskTime(payload.task._id, payload.seconds);
    }

    onRemove(task: Task) {
        this.taskStore.removeTask(task._id);
    }
}
