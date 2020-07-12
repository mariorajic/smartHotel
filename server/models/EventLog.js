module.exports = function (sequelize, DataTypes) {
    return sequelize.define('event_log', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'events',
                key: 'id'
            },
            validate: {
                notEmpty: true,
                isNumeric: true
            }
        },
        room_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'rooms',
                key: 'id'
            },
            validate: {
                notEmpty: true,
                isNumeric: true
            }
        },
    }, {
        timestamp: true,
        underscored: true
    });
};
