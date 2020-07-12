module.exports = function (sequelize, DataTypes) {
    return sequelize.define('key', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                unique: true
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