var express = require('express')
var app = express()
var cors = require("cors");
app.use(cors());

const sql = require('mssql')
const config = {
  user: 'sa',
  password: '123456',
  server: 'DESKTOP-IL7UVNG', // You can use 'localhost\\instance' to connect to named instance
  database: 'KFAS',
}
try {

  app.get('/', function (req, res) {

    return (async function () {
      try {
        let pool = await sql.connect(config)
        let result1 = await pool.request()
          .input('USUARIO', sql.VarChar(20), "EZERPA")
          .query('SELECT * FROM USUSU WHERE USUARIO = @USUARIO')

        console.dir(result1)

        // // Stored procedure
        // let result2 = await pool.request()
        //   .input('input_parameter', sql.Int, value)
        //   .output('output_parameter', sql.VarChar(50))
        //   .execute('procedure_name')

        return res.status(200).send(result1).end();
        // console.dir(result2)
      } catch (err) {
        return res.status(500).send(err).end();
      }
    })()

  })

  app.get('/afiliados/:idafiliado?', function (solicitud, respuesta) {
    return (async function () {
      try {
        let pool = await sql.connect(config)
        let result1 = await pool.request()
          .input('IDAFILIADO', sql.VarChar(20), (solicitud.params.idafiliado) ? solicitud.params.idafiliado : "")
          .query("SELECT * FROM AFI")
        sql.close();
        return respuesta.status('200').send(JSON.stringify({ success: true, result: result1 })).end();
        // return respuesta.status(200).send(result1).end();
      } catch (err) {
        return respuesta.status('500').send(JSON.stringify({ success: false, error: err })).end();
        // return respuesta.status(500).send(err).end();
      }
    })()
    // return respuesta.status(200).send("Listado de Afiliados").end()
  })
} catch (err) {
  console.log(err)
}
const puerto = 3000;
app.listen(puerto, function () {
  console.log(`Curso.api está ejecutandose en el puerto ${puerto}`);
})