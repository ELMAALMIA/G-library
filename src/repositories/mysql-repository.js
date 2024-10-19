const mysql = require('mysql');

 
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
                    resolve("La connexion bien établie...");// 0 ou 1 params
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
                        results, 
                        fields: fields.map(f => f.name) 
                    });
                }
            });
        });
    }
    insert(tableName, data) {
        let query = `INSERT INTO ${tableName} SET ?`;
        return new Promise((resolve, reject) => {

            return this.db.query(
                query,
                (err)=>{
                    if(err){
                        console.log("Errer", err);
                    reject(err);
                    }
                    else resolve()
                }
            )
        });
    }
    
}