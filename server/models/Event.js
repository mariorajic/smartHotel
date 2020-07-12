module.exports = function (sequelize, DataTypes) {
    return sequelize.define('event', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
                isNumeric: true
            }
        },
        message: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isNumeric: true
            }
        },
        sos: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        },
    }, {
        timestamp: true,
        underscored: true
    });
};
