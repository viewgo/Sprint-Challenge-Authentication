const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findByDpt,
  findById
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findByDpt(filter) {
  console.log("findByDpt Filter: ", filter);
  return db("users").where("department", filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
