module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.TEXT,
        alloNull: false,
      },
      username: {
        type: DataTypes.STRING(32),
        primaryKey: true,
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
