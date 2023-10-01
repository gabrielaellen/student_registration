module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      test_grade_one: {
        type: Sequelize.DOUBLE,
        validate: {
          min: 0,
          max: 10
      }
      },
      test_grade_two: {
        type: Sequelize.DOUBLE,
        validate: {
          min: 0,
          max: 10
      }
      },
      average_test_grade: {
        type: Sequelize.DOUBLE
      },
      situation: {
        type: Sequelize.STRING
      }
    });
  
    return Student;
  };