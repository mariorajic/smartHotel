module.exports = function (sequelize, DataTypes) {
    return sequelize.define('booking_key', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        booking_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'bookings',
                key: 'id'
            },
            validate: {
                notEmpty: true
            }
        },
        key_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'keys',
                key: 'id'
            },
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
    }, {
        timestamp: true,
        underscored: true
    });
};