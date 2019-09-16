import { Injectable } from '@angular/core';
import { Items } from '../indexDBSetup/DBModels/item';
import { db } from '../indexDBSetup/appDb';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }

  public addItems = (item: string) => {
    db.transaction('rw', db.items, async () => {
      await db.items.add({name: item}).then(() => {
        console.log('Successfully inserted');
      }).catch(err => {
        console.log(err);
      });
    }).then(() => {
      console.log('Transaction completed');
    }).catch((error) => {
      console.log(error.stack);
    });
  }

  public getAllItems = (callback) => {
     db.transaction('r', db.items, async () => {
        await db.items.toArray().then((response) => {
          callback(response);
        });
     }).then(() => {
       console.log('Transaction successful');
     }).catch(err => {
       console.log(err.stack);
     });
  }
}
