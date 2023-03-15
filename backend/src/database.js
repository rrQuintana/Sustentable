const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI
          ? process.env.MONGODB_URI
          : 'mongodb://localhost:27017/Xchange';

mongoose.connect(URI,
    (error) => {
        if (error) console.error(error ,
        error.stack)
        else console.log("Conexión correcta a database: ",URI);
    })