import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";
import { List } from "immutable";

import { Task } from "./task";
//import { TaskDB } from "./task.db";

import * as Datastore from "nedb";

import Q = require("q");

@Injectable()
export class TaskStore {
    private _tasks: BehaviorSubject<List<Task>> = new BehaviorSubject(List([]));

    public tasks: Observable<List<Task>> = this._tasks.asObservable();

    private db: Datastore;
    private coll: BaseCollection<Task>;

    constructor() {
        this.db = new Datastore({ filename: 'taskdb', autoload: true });
        this.coll = new BaseCollection<Task>(this.db);
    }

    createTask(taskName: string) {
        let task: Task = { name: taskName, timeInSeconds: 0 };
        this.coll.insert(task).then(function(createdTask: Task) {
            this._tasks.next(this._tasks.getValue().push(createdTask));
        }.bind(this));
    }
}

// BaseCollection generic class, based on promises.
// Consider using observables instead?
class BaseCollection<T> {

    constructor(private dataStore: Datastore) {
    }

    insert(document: T) {
        
        let deferred = Q.defer<T>();

        this.dataStore.insert<T>(document, function(err: any, newDoc: T) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newDoc);
            }
        });

        return deferred.promise;
    }
}