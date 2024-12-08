import { Sequelize } from "sequelize";

const sequelize = new Sequelize('bookingcare', 'root', 'tanphi1040', {
    host: 'localhost',
    dialect: 'mysql'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;