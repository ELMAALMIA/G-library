
 function main(){
    let db = new MySqlRepository();
    db.open()
    .then(msg=>console.log(msg))
    .catch(err=> console.log("  Rerr", err));


    db.close
}

main();