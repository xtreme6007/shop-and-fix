
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    // The email cannot be null, and must be a proper email before creation
    task_name: {
        type: DataTypes.STRING,
        allownull: false
  
      },
      task_cost: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }

  });

  return Task;
};