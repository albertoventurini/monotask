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

    update(query: any, updateQuery: any, options?: any) {
        let deferred = Q.defer<number>();
        this.dataStore.update(query, updateQuery, options, function (err: any, numberOfUpdated:number) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(numberOfUpdated);
            }
        });
        return deferred.promise;
    }

    load(query: any) {
        let deferred = Q.defer<T[]>();
        this.dataStore.find(query, function(err: any, docs: T[]) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(docs);
            }
        });
        return deferred.promise;
    }

    remove(query: Object, options?: any) {
        let deferred = Q.defer<number>();
        this.dataStore.remove(query, options, function(err, numberOfRemoved) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(numberOfRemoved);
            }
        });
        return deferred.promise;
    }

    // private wrapWithPromise<U>(f: Function) {
    //     let deferred = Q.defer<U>();

    // }
}