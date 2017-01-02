import * as Datastore from "nedb";
import Q = require("q");

export class BaseCollection<T> {

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

    remove(query: any, options?: any) {
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

    private wrapWithPromise<U>(f: Function) {
        return (...args: any[]) => {
            let deferred = Q.defer<U>();
            f(args, (err: any, result: U) => {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
            });
            return deferred.promise;
        };
    }
}