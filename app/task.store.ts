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
        this.addTask({ id: 1, name: "first task" });
    }

    addTask(newTask: Task) {
        this._tasks.next(this._tasks.getValue().push(newTask));
    }
}