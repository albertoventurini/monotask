import { Component, Input } from '@angular/core';

import { TaskStore } from './task.store';

@Component({
    moduleId: module.id,
    selector: 'new-task',
    templateUrl: './new-task.component.html'
})
export class NewTaskComponent {

    taskName: string;

    constructor(private taskStore: TaskStore) {

    }

    addTask() {
        this.taskStore.createTask(this.taskName);
        this.taskName = "";
    }

    
}
