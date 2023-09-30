module.exports = {
    HOST: "db",
    USER: "student_registration",
    PASSWORD: "student_registration",
    DB: "student_registration",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };