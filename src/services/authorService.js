import MySqlRepository from "../repositories/mysql-repository.js";

let db = new MySqlRepository('biblio');

export default class AuthorService{

   constructor(){

   }
    
    
    
     conexion(){
       return  db.open()
        .then(msg=>console.log(msg))
        .catch(err=> console.log("  Rerr", err));
       
    }
    close(){
        db.close();
    }
    
    
     select(){
     return   db.select('authors').then(
            (data)=>console.log(data),
    
        ).catch(
            (err)=>console.log(err)
        )
    }
    
    
    insert(data){
      
    
         
         return   db.insert('authors',data);
    
    }
    
     update(data, id, idColumn){
       return db.update(
            'authors',
            data,
            id,
            idColumn
        )
    
    }
    
     remove(id, idColumn){
      return  db.remove('authors', id, idColumn);
    }
     findById(id, idColumn){
      return  db.selectByID('authors', id, idColumn).then(
            a=>console.log(`author id = ${id} `, a)
        ).catch(
        err=> console.log("Error ",err)
    );
    }
    
    
}