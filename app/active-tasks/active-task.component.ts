import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Task } from '../task/task';
import { Timer } from '../utils/timer';

@Component({
    selector: 'active-task',
    template: `
        <div>
            {{task.name}} - Total time: {{seconds | secondsToHhMmSs}}
            - Created at: {{task.createdAt | date:short}}
            <button (click)="start()">Start</button>
            <button (click)="stop()">Stop</button>
            <button (click)="remove()">Remove</button>
        </div>
    `
})
export class ActiveTaskComponent {
    @Input() task: Task;
    @Output() onStart = new EventEmitter<Task>();
    @Output() onStop = new EventEmitter<any>();
    @Output() onRemove = new EventEmitter<Task>();

    private timer: Timer = new Timer();
    private seconds: number;

    ngOnInit() {
        this.seconds = this.task.timeInSeconds;
    }

    start() {
        this.timer.start(this.seconds, (elapsed: number) => this.seconds = elapsed);
        this.onStart.emit(this.task);
    }

    stop() {
        this.timer.stop();
        this.onStop.emit({ task: this.task, seconds: this.seconds });
    }

    remove() {
        this.onRemove.emit(this.task);
    }
}