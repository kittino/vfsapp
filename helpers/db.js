import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('vfscards.db');

// create basic table for vfs cards
export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
        //tranzaction object = tx
        //az elérési utat tartalmazza az uri, nem a file-t
        tx.executeSql('CREATE TABLE IF NOT EXISTS vfscards (id INTEGER PRIMARY KEY NOT NULL, imageUri TEXT NOT NULL);',
        [],
        () => {
            resolve();
        },
        (_, err) => {
            reject(err);
        });
        }) 
    })
    return promise;
}

