module.exports = function (sequelize, DataTypes) {
    return sequelize.define('floor', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
                isNumeric: true
            }
        },
        is_deleted: {
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
