import Dexie from 'dexie';
import { Items } from './DBModels/item';
export class AppDatabase extends Dexie {

  items: Dexie.Table<Items, number>;

    constructor() {
        super('SampleDB');
        const dbContext = this;

        dbContext.version(1).stores({
          items: '++id, name'
        });

        dbContext.items.mapToClass(Items);

    }

}

export const db = new AppDatabase();
