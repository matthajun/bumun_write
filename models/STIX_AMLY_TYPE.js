const Sequelize = require('sequelize');

module.exports = class STIX_AMLY_TYPE extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            anomaly_type: {
                type: Sequelize.STRING(10),
                allowNull: false,
                primaryKey: true
            },
            description: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'STIX_AMLY_TYPE',
            tableName: 'stix_amly_type',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};