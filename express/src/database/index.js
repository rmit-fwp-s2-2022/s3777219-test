const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);

// Relate post and user.
db.post.belongsTo(db.user, {
  foreignKey: { name: "username", allowNull: false },
});

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });

  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0) return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({
    username: "Long",
    password_hash: hash,
    first_name: "Nguyen",
    last_name: "Hoang",
  });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({
    username: "Tania",
    password_hash: hash,
    first_name: "Tania",
    last_name: "",
  });
}

module.exports = db;
