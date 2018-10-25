
const express = require('express');
const app = express();

app.get('/', function(req , res){
    res.end('Hola Mundo JS');
});

app.listen(3000, function(){
    console.log('Servidor Funcionando, by J@RC en el puerto 3000');
});

