import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";
import { List } from "immutable";

import { Task } from "./task";

@Injectable()
export class TaskStore {
    private _tasks: BehaviorSubject<List<Task>> = new BehaviorSubject(List([]));

    public tasks: Observable<List<Task>> = this._tasks.asObservable();

    constructor() {
    }

    createTask(taskName: string) {
        let newTask: Task = { id: 1, name: taskName, timeInSeconds: 0 }; // hard-wiring id = 1, to be changed
        this._tasks.next(this._tasks.getValue().push(newTask));
    }
}