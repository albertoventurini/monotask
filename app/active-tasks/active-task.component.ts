import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { Task } from '../task/task';

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
    private seconds: number;
    @Output() onStop = new EventEmitter<any>();
    @Output() onRemove = new EventEmitter<number>();

    private subscription: Subscription;

    private observableTimedSequence = Observable.interval(1000);

    ngOnInit() {
        this.seconds = this.task.timeInSeconds;
    }

    start() {
        this.subscription = this.observableTimedSequence.subscribe(x => this.seconds++);
    }

    stop() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
        this.onStop.emit({ taskId: this.task._id, seconds: this.seconds });
    }

    remove() {
        this.onRemove.emit(this.task._id);
    }
}