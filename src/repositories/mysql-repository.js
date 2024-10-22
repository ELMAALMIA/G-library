import mysql from "mysql"

 
export default class MySqlRepository{

    constructor(database, host= 'localhost',user='root', password ='' ){
        this.params ={host, database, user, password}
        this.db = mysql.createConnection(this.params);
    }


    open(){
        return new Promise((resolve, reject) => {
            this.db.connect((err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve("La connexion bien établie...");
                }
            });
            });
        
    }



    close(){
            this.db.end();
    }
    select(tableName) {
        let query = `SELECT * FROM ${tableName}`;
        return new Promise((resolve, reject) => {
            this.db.query(query, (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
              
                    resolve({ 
                        results: results.map(r => JSON.parse(JSON.stringify(r))),
                    
                    });
                }
            });
        });
    }
    insert(tableName, data) {
        const fields = Object.keys(data).join(', ');
        const val = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        const query = `INSERT INTO ${tableName} (${fields}) VALUES (${val})`;
    
        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err) => {
                if (err) {
                    console.log("Error", err);
                    reject(err);
                } else {
                    console.log("inserted successfully");
         
                    resolve(values);
                }
            });
        });



    }

    update(tableName, data, id, idColumn) {
        const fields = Object.keys(data).map(field => `${field} = ?`).join(', ');
        const values = [...Object.values(data), id]; 
        const query = `UPDATE ${tableName} SET ${fields} WHERE ${idColumn} = ?`;
    
        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err) => {
                if (err) {
                    console.log("Error :", err);
                    reject(err);
                } else {
               
                    console.log("Updated successfully");
                    resolve(values);
                }
            });
        });
    }

    remove(tableName,id, idColumn) {
      
        const query = `DELETE FROM ${tableName} WHERE ${idColumn} = ${id}`;
    
        return new Promise((resolve, reject) => {
            this.db.query(query,  (err) => {
                if (err) {
                    console.log("Error :", err);
                    reject(err);
                } else {
           
                    console.log(`Deleted successfully ${id}`);
                    resolve();
                }
            });
        });
    }

    selectByID(tableName, id, idColumn) {
        let query = `SELECT * FROM ${tableName} where ${idColumn} like ${id}`;
        return new Promise((resolve, reject) => {
            this.db.query(query, (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    if(results==undefined)return reject(err)
                    resolve(JSON.parse(JSON.stringify(results[0]))); 
                }
            });
        });
    }
    
    
    
    
}