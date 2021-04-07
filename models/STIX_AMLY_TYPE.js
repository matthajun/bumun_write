const Sequelize = require('sequelize');

module.exports = class anomaly extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            anomaly_type: {
                type: Sequelize.STRING(10),
                primaryKey: true,
            },
            description: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'anomaly',
            tableName: 'stix_anomaly_type',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};