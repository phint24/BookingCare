'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DoctorInfo extends Model {
        static associate(models) {
            // define association here
        }
    }
    DoctorInfo.init({
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specialtyId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'DoctorInfo',
    });
    return DoctorInfo;
};