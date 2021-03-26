const Sequelize = require('sequelize');

module.exports = class KDN_AMLY_H002_MEMORY_INFO extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            message_id: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            keeper_id: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            send_time: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            confirm_code: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: 'local',
            },
            usage: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            capacity: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            date_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'KDN_AMLY_H002_MEMORY_INFO',
            tableName: 'kdn_amly_H002_memory_info',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
