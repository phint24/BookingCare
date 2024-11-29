'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {
        static associate(models) {
            // define association here
        }
    }
    History.init({
        doctorId: DataTypes.STRING,
        patientId: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};