import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { Task } from '../task/task';
import { TaskStore } from '../task/task.store';

@Component({
    selector: 'active-task',
    template: `
        <div>
            {{task.name}} - {{seconds}}
            <button (click)="onStart()">Start</button>
            <button (click)="onStop()">Stop</button>
            <button (click)="onRemove()">Remove</button>
        </div>
    `
})
export class ActiveTaskComponent {
    @Input() task: Task;
    private seconds: number;

    private subscription: Subscription;

    private observableTimedSequence = Observable.interval(1000);

    constructor(private taskStore: TaskStore) {
    }

    ngOnInit() {
        this.seconds = this.task.timeInSeconds;
    }

    onStart() {
        this.subscription = this.observableTimedSequence.subscribe(x => this.seconds++);
    }

    onStop() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
        this.task.timeInSeconds = this.seconds;
        this.taskStore.setTaskTime(this.task._id, this.seconds);
    }
}