import { Component, OnInit } from '@angular/core';
import { DbService } from './services/db.service';
import { Items } from './indexDBSetup/DBModels/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angularDexiePwaSample';
  newItem: string;

  itemsToDisplay: string[] = [];

  constructor(private dbService: DbService) {
  }

  ngOnInit(): void {
    this.dbService.getAllItems((response: Items[]) => {
      if (response !== null && response !== undefined) {
      this.itemsToDisplay = [...response.map(item => item.name)];
      }
    });
  }

  public addBtnHandler = () => {
    this.itemsToDisplay.push(this.newItem);
    this.dbService.addItems(this.newItem);
  }
}
