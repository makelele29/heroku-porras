var express = require('express');
var router = express.Router();
var model_partido=require('../models/partido.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// Crea una porra
router.put('/porra/:competition/:year/:local/:visitante', function( req, res) {
    var nueva_porra=new model_partido({
      ID:req.params.local+"-"+req.params.visitante+"-"+req.params.competition+"-"+req.params.year,
      equipo_local:req.params.local,
      equipo_visitante:req.params.visitante,
      competition:req.params.competition,
      año:req.params.year,
      resultado:"Proximamente"
    });
    nueva_porra.save(function(err, result) {
      if(err) return res.json(500,{mensaje: 'Esta porra ya esta'});
      res.json(200,"La porra ha sido creada con exito");

    });

});
router.put('/apuesta/:menda/:competition/:year/:local/:goles_local/:visitante/:goles_visitante', function( req, res ) {
    model_partido.findOneAndUpdate({ID:req.params.local+"-"+req.params.visitante+"-"+req.params.competition+"-"+req.params.year},{$push: {"apuestas": {usuario:req.params.menda , goles_local:  req.params.goles_local,goles_visitante : req.params.goles_visitante }}},function(error,result){
       if(result.length==0) return res.json(500, { mensaje: "No existe esa porra" });
       res.json(200,"La apuesta ha sido guardada");

    });

});
// Pone el resultado de la porra
router.post('/porra/resultado/:competition/:year/:local/:goles_local/:visitante/:goles_visitante', function( req, res ) {
  model_partido.findOneAndUpdate({ID:req.params.local+"-"+req.params.visitante+"-"+req.params.competition+"-"+req.params.year},{$set: {"resultado": req.params.goles_local + "-" + req.params.goles_visitante}},function(error,result){
     if(result.length==0) return res.json(500, { mensaje: "No existe esa porra" });
     res.json(200,"Resultado añadido<hr>");

  });


});

router.get('/porras', function( req, res) {
  model_partido.find(function(err, result) {
   if(err) return res.json(500, { mensaje:err.message});
   if(result.length==0) return res.json(500, { mensaje: 'No hay ninguna porra' });
   res.json(200,result);
 });


});
// Baja todas las apuestas de un partido determinado
router.get('/porra/:ID', function(req, res) {
  model_partido.find({ID:req.params.ID},{apuestas:1,_id:0},function(err, result) {
   if(err) return res.json(500, { mensaje:err.message});
   if(result.length==0) return res.json(500, { mensaje: 'No hay ninguna porra' });
   res.json(200,result);
 });
});


module.exports = router;
