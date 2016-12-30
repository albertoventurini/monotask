import { Injectable } from "@angular/core";
import { Task } from "./task";
import * as Datastore from "nedb";


@Injectable()
export class TaskDB {



    constructor() {
        let db = new Datastore();

      db.loadDatabase(function() {
        db.insert({ hello: 'world' }, function() {
          db.find({}, function(err:any, docs:any) {
            if(err) {
              console.log(err);
            } else {
              console.log(docs);
            }
          });
        });
      });        
    }

}