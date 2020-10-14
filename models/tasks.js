
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    
    car_make: {
        type: DataTypes.STRING,
        allownull: false
  
      },
      car_model: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      license_plate: {
        type: DataTypes.STRING,
        allowNull: true
      },
      package: {
        type: DataTypes.STRING,
        allowNull: true

      },
      parking_space: {
        type: DataTypes.STRING,
        allowNull: true
      },
      complete: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }

  });


 

  return Task;
};


