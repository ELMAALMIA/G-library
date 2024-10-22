import MySqlRepository from "./repositories/mysql-repository.js";


 
let data = {
    "Author":"EL MAALMI",
    "Year_Born": 2001
    }



function testConexion(){
  
}


function testSelect(){
    db.select('authors').then(
        (data)=>console.log(data),

    ).catch(
        (err)=>console.log(err)
    )
}


function testInsert(data){
  

        if( data.Au_ID==null){
            data.Au_ID=currentId
        }
        db.insert('authors',data);

}

function testUpdate(data, id, idColumn){
    db.update(
        'authors',
        data,
        id,
        idColumn
    )

}

function testRemove(id, idColumn){
    db.remove('authors', id, idColumn);
}
function findById(id, idColumn){
    db.selectByID('authors', id, idColumn).then(
        a=>console.log(`author id = ${id} `, a)
    ).catch(
    err=> console.log("Error ",err)
);
}

function main(){
    testSelect();
}

main();