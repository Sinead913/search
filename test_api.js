var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("https://helloworld-chznwwuy5a-uc.a.run.app");

describe("API test",function(){
  it("should return a 200 response",function(done){

    server.get("/")
    .query({ search: 'test' })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });

  it("should return 404",function(done){

    server.get("/random123")
    .query({ search: 'test' })
    .expect("Content-type",/json/)
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  });

});
