import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import PouchDB from 'pouchdb';
import find    from 'pouchdb-find';

import prettyjson from 'prettyjson';
import { NgProgress } from 'ngx-progressbar';

/*
  Generated class for the LoggingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoggingProvider {

  dbLocal:  PouchDB.Database;
  dbRemote: PouchDB.Database;

  constructor(

    public http: Http,
    public ngProgress: NgProgress
    
  ) {
    console.log('Hello LoggingProvider Provider');
    // init 
    PouchDB.plugin(find);
    this.initPouchDB();

  }


  initPouchDB() {
    this.ngProgress.start();
    

    this.dbLocal = new PouchDB('logging');
    console.log("dbLocal", this.dbLocal);

    this.dbRemote = new PouchDB('https://contact:contact@jrg.deneb.uberspace.de/couchdb/logging');
    console.log("dbRemote", this.dbRemote);

    this.ngProgress.done();
    
    this.sync();
  }


  sync() {
    this.ngProgress.start();
    
    return this.dbLocal.sync(this.dbRemote).then(
      ok => {
        this.ngProgress.done();
        console.log("sync", ok)
      },
      er => {
        this.ngProgress.done();
        console.log("error", er)
      }
    );
  } 


  log(logBody) {
    let logEntry = new LogEntry();

    logEntry.body = ''
    for (var i = 0, j = arguments.length; i < j; i++) {
      logEntry.body += (prettyjson.render(arguments[i]) + '\r\n');
    }

    console.log(getDateTimeString(), ' ---> ', logEntry.body)
  
    return this.dbLocal.put(logEntry)
  }

}



function getDateTimeString () {
  var myDate = new Date();
  var myDateString = 
      myDate.getFullYear() + '-' +
      ('0' + (myDate.getMonth()+1)).slice(-2) + '-' +
      ('0' + myDate.getDate()).slice(-2) + ' ' +
      ('0' + myDate.getHours()).slice(-2) + ':' +
      ('0' + myDate.getMinutes()).slice(-2) + ':' +
      ('0' + myDate.getSeconds()).slice(-2) + '.' +
      myDate.getMilliseconds() 
      
  return myDateString;
      
}







class LogEntry {
  _id:  string = getDateTimeString();
  date: string = getDateTimeString();
  body: any;
}
