
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    // The email cannot be null, and must be a proper email before creation
    package_name: {
        type: DataTypes.STRING,
        allownull: false
  
      },
      package_price: {
        type: DataTypes.INTEGER,
        allowNull: true
      }

  });

  Task.sync().then(() => {
    Task.create({
      package_name: "Jade",
      price: 10
    });
    Task.create({
      package_name: "ruby",
      package_price: 20
    });
    Task.create({
      package_name: "Blue Diamond",
      package_price: 50
    });
  });

  return Task;
};