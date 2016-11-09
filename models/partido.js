var mongoose     = require('mongoose');

// create a schema
var userSchema = new mongoose.Schema({
  ID: { type: String, required: true, index:{unique: true} },
  equipo_local: String,
  equipo_visitante: String,
  competicion: String,
  año: Number,
  apuestas:[{
		usuario:String,
		goles_visitante:Number,
		goles_local:Number
	}],
  resultado:String

});


module.exports= mongoose.model('partido', userSchema);
