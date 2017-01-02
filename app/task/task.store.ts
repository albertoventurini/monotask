import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";
import { List } from "immutable";
import * as Datastore from "nedb";

import { Task } from "./task";
import { BaseCollection } from '../utils/basecollection';

@Injectable()
export class TaskStore {
    private _tasks: BehaviorSubject<List<Task>> = new BehaviorSubject(List([]));
    public tasks: Observable<List<Task>> = this._tasks.asObservable();
    private coll: BaseCollection<Task>;

    constructor() {
        let db = new Datastore({ filename: 'taskdb', autoload: true });
        this.coll = new BaseCollection<Task>(db);
    }

    createTask(taskName: string) {
        let task: Task = { name: taskName, timeInSeconds: 0 };
        this.coll.insert(task)
            .then( (createdTask: Task) => this._tasks.next(this._tasks.getValue().push(createdTask)));
    }

    setTaskTime(taskId: number, newTime: number) {
        this.coll.update({ '_id': taskId }, { $set: { timeInSeconds: newTime } }, {})
            .then( _ => {
                let currentList = this._tasks.getValue();
                let index = currentList.findIndex(t => t._id === taskId);
                currentList = currentList.update(index, t => {
                    t.timeInSeconds = newTime;
                    return t;
                });
                this._tasks.next(currentList);
            });
    }

    // updateTask(task: Task) {
    //     let currentList = this._tasks.getValue();
    //     let index = currentList.findIndex(t => t._id === task._id);
    //     currentList = currentList.update(index, t => task);
    //     this._tasks.next(currentList);
    // }

    loadTodaysTasks() {
        this.coll.load({})
            .then( (tasks: Task[]) => this._tasks.next(List<Task>(tasks)) );
    }

    removeTask(taskId: number) {
        this.coll.remove({ '_id': taskId  }, {})
            .then( _ => {
                let currentList = this._tasks.getValue();
                let index = currentList.findIndex(t => t._id === taskId);
                currentList = currentList.remove(index);
                this._tasks.next(currentList);
            });
    }
}

