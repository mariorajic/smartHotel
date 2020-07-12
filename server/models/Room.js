module.exports = function (sequelize, DataTypes) {
    return sequelize.define('room', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        number: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
                isNumeric: true
            }
        },
        capacity: {
            type: DataTypes.INTEGER,
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
        door_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        },
        window_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        },
        key_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        },
        sos_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        },
        floor_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'floors',
                key: 'id'
            },
            validate: {
                notEmpty: true
            }
        },
        // occupied: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        //     validate: {
        //         notEmpty: true
        //     }
        // },
    }, {
        timestamp: true,
        underscored: true
    });
};