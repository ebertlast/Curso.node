
//modulos requeridos
const express = require('express');
//const morgan = require('morgan');
const cors = require('cors');
const app = express();

//configuraciones
app.use(cors());
//app.use(morgan('dev'));

//conexion a sql server
const sql = require('mssql')
const config = {
  user: 'sa',
  password: 'Jarc3424',
  server: 'JARC-PC', 
  database: 'KSMSALUD',
}

//rutas
app.get('/', function(req , res){
    console.log('Hola Mundo JS, peticion de la ruta /: '+ req.url);
    (async function () {
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
            //.input('USUARIO', sql.VarChar, 'JRIOS')
            // .query('SELECT * FROM USUSU WHERE USUARIO= @USUARIO')
            .query('SELECT * FROM USUSU ')
            
            console.dir("Resultado: "+ JSON.stringify({ success: true, result: result.recordset }))
            res.end(JSON.stringify({ success: true, result: result.recordset }));
        } catch (err) {
            console.error("Error: "+err)
        } finally{
            sql.close();
        }
    })() 
})


app.get('/users/:usuario?', function(req , res){
    console.log('Hola Mundo JS, peticion de la ruta /users/: '+ req.url);
    (async function () {
        try {
            console.log('parametro recibido ', req.params);
            
            let pool = await sql.connect(config)
            let result = await pool.request()
            .input('USUARIO', sql.VarChar, (req.params.usuario) ? req.params.usuario : "%")
            .query('SELECT * FROM USUSU WHERE USUARIO LIKE @USUARIO')
            
            console.dir("Resultado: "+ JSON.stringify({ success: true, result: result.recordset }))
            res.end(JSON.stringify({ success: true, result: result.recordset }));
        } catch (err) {
            console.error("Error: "+err)
        } finally{
            sql.close();
        }
    })() 
})

app.get('*', function(req , res){
    console.log('Hola Mundo JS, peticion de ruta desconocida '+ req.originalUrl);
    res.end('Hola Mundo JS, peticion de ruta desconocida: '+ req.originalUrl);
});

app.listen(3000, function(){
    console.log('Servidor Funcionando, by J@RC en el puerto 3000');
});

