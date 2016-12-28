import { Component, Input } from '@angular/core';

import { Task } from '../task/task';

@Component({
    selector: 'active-task',
    template: `
        <div>
            {{task.name}} - {{task.timeInSeconds}}
            <button>Start</button>
            <button>Stop</button>
            <button>Remove</button>
        </div>
    `
})
export class ActiveTaskComponent {
    @Input() task: Task;
}