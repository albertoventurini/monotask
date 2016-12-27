import { Component } from '@angular/core';

import { TaskStore } from './task.store';

@Component({
    moduleId: module.id,
    selector: 'new-task',
    templateUrl: './new-task.component.html'
})
export class NewTaskComponent {

    constructor(private taskStore: TaskStore) {

    }

    
}
