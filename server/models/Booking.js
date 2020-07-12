module.exports = function (sequelize, DataTypes) {
    return sequelize.define('booking', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        lastname: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        date_from: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: true,
            }
        },
        date_to: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: true
            }
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        },
        room_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'rooms',
                key: 'id'
            },
            validate: {
                notEmpty: true
            }
        },

    }, {
        timestamp: true,
        underscored: true
    });
};