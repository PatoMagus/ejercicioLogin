import mongoose from 'mongoose';

mongoose.connect("mongodb://LocalHost/apidb", { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
     })
    .then(db => console.log('Conectado a la Base de Datos'))
    .catch(error => console.log(error));