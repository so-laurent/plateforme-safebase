  var connectionToMainDb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'safebase'
  });

  connectionToMainDb.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO actions (type, db_name, db_type) 
    VALUES ('save', '${dbName}', 'mysql')`;
    console.log(sql);
    connectionToMainDb.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });