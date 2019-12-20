const request = require("supertest");
const router = require("./auth-router.js");
const Users = require("../users/users-model.js");
const db = require("../database/dbConfig");

describe("auth-router.js", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("environment", function() {
    it("env should be on testing", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });

  describe("add()", function() {
    it("should insert a user to database", async function() {
      await Users.add({ username: "test", password: "pass" });

      const users = await db("users");
      expect(users[0].username).toBe("test");
    });
  });

  describe("find()", function() {
    it("should return our user", async function() {
      await Users.add({ username: "test", password: "pass" });

      await Users.find().then(users => {
        expect(users[0].username).toBe("test");
      });
    });
  });
});
