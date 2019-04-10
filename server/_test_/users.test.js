// import chaiHttp from "chai-http";
import request from "supertest";
import {expect} from "chai";
import http from "node-mocks-http";
import app from "../index";


describe('Testing User Controller', () => {
    // before((done) => {
    //   TestTables.createTables();
  
    //   done();
    // });
  
    it('should register a new user when all the parameters are given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send( {
            id:1,
            firstname: 'mike',
            lastname: 'umanah',
            email: 'test@test.com',
            password: 'password',
            confirmPassword: 'password'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(response.text);
            expect(responseData).to.be.a('object');
          }
  
          done();
        });
    });

    it("should not register when email is missing", (done) => {
      request(app)
      .post("/api/v1/auth/signup")
      .send({
        id:1,
        firstname: 'mike',
        lastname: 'umanah',
        password: 'password',
        confirmPassword: 'password'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if(err) throw err;
        else{
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an("object");
        }
        done();
      });
    });
    
    it("should not register a user when the first name is missing", (done) => {
      request(app)
      .post("/api/v1/auth/signup")
      .send({
        id:1,
        lastname: 'umanah',
        password: 'password',
        email: 'test@test.com',
        confirmPassword: 'password'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if(err) throw err;
        else{
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an("object");
        }
        done();
      });
    });
    
    it("should not register a user when the last name is missing", (done) => {
      request(app)
      .post("/api/v1/auth/signup")
      .send({
        id:1,
        firstname: 'umanah',
        password: 'password',
        email: 'test@test.com',
        confirmPassword: 'password'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if(err) throw err;
        else{
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an("object");
        }
        done();
      });
    });
    
    it("should not register a user when the password is missing", (done) => {
      request(app)
      .post("/api/v1/auth/signup")
      .send({
        id:1,
        firstname: 'umanah',
        lastname: 'nebucad',
        email: 'test@test.com',
        confirmPassword: 'password'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if(err) throw err;
        else{
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an("object");
        }
        done();
      });
    });
   
    it("should not register a user when the passwords do not match", (done) => {
      request(app)
      .post("/api/v1/auth/signup")
      .send({
        id:1,
        firstname: 'umanah',
        lastname: 'nebucad',
        email: 'test@test.com',
        password: 'passworded',
        confirmPassword: 'password'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if(err) throw err;
        else{
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an("object");
        }
        done();
      });
    });
  
    it("should not signin a user when email is not supplied", (done) => {
      request(app)
      .post("/api/v1/auth/signin")
      .send({
        id:1,
        password: 'passworded'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if(err) throw err;
        else{
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an("object");
        }
        done();
      });
    });

    it("should not signin a user when password is not supplied", (done) => {
      request(app)
      .post("/api/v1/auth/signin")
      .send({
        id:1,
        email: 'test@test.com'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if(err) throw err;
        else{
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an("object");
        }
        done();
      });
    });
})