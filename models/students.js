module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students", {
      name: {
        type: Sequelize.STRING
      },
      test_grade_one: {
        type: Sequelize.DOUBLE
      },
      test_grade_two: {
        type: Sequelize.DOUBLE
      }
    });
  
    return Student;
  };