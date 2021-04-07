const Sequelize = require('sequelize');

module.exports = class anomaly_ip extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            no: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            unit_id: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            make_id: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            device_ip: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            device_mac: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'anomaly_ip',
            tableName: 'stix_anomaly_ip',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};