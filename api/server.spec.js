const request = require("supertest");
const app = require("./server");
const db = require("../database/dbConfig.js");
const Users = require("../users/users-model.js");

describe("auth-router.js", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("register", () => {
    it("register hugo", async function() {
      return request(app)
        .post("/api/auth/register")
        .send({ username: "hugo", password: "hugo" })
        .then(res => {
          console.log(res.status);
          expect(res.status).toBe(201);
        });
    });

    it.skip("register jaytee", async function() {
      return request(app)
        .post("/api/auth/register")
        .send({ username: "jaytee", password: "jaytee" })
        .then(res => {
          console.log(res.status);
          expect(res.status).toBe(201);
        });
    });

    it("login and get", async function() {
      return request(app)
        .post("/api/auth/login")
        .send({ username: "hugo", password: "hugo" })
        .then(res => {
          console.log("RES.BODY!!!!!!!!!!!!!!!!!!", res.body);
          const token = res.body.token;

          return request(app)
            .get("/api/jokes")
            .set("authorization", token)
            .then(res => {
              console.log(res.status);
              expect(res.status).toBe(200);
              expect(Array.isArray(res.body)).toBe(true);
            });
        });
    });
  });
});
