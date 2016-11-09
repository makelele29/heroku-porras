
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
describe('Test Partidos (Mongodb)', function() {
  it('Deberia añadir Copa del Rey 2017 Malaga-Granada',function(done){
    chai.request(server)
    .put('/porra/Copa-del-Rey/2017/Malaga/Granada')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();

    });

  });
  it('Deberia no añadir Copa del Rey 2017 Malaga-Granada de nuevo',function(done){
    chai.request(server)
    .put('/porra/Copa-del-Rey/2017/Malaga/Granada')
    .end(function(err, res){
      res.should.have.status(500);
      res.should.be.json;
      done();

    });

  });
  it('Deberia añadir una apuesta del usuario javi 1-1',function(done){
    chai.request(server)
    .put('/apuesta/javi/Copa-del-Rey/2017/Malaga/1/Granada/1')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();

    });
  });
  it('Deberia añadir un resultado al partido',function(done){
      chai.request(server)
      .post('/porra/resultado/Copa-del-Rey/2017/Malaga/1/Granada/0')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('Deberia mostrar todas las porras',function(done){
      chai.request(server)
      .get('/porras')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });



  });

});
