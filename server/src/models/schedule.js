'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schudule extends Model {
        static associate(models) {
            // define association here
        }
    }
    Schudule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING,
        doctorId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Schudule',
    });
    return Schudule;
};