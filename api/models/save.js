module.exports = function(sequelize, DataTypes) {
  var Save = sequelize.define('Save', {
    sessionId: DataTypes.TEXT('long'),
    userId: DataTypes.TEXT('long'),
    save: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        save.belongsTo(models.User, {
          as: "user",
          foreignKey: "userId",
          foreignKeyConstraint: true
        });
      }
    }
  });
  return Save;
};