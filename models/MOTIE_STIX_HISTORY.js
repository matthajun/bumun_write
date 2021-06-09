const Sequelize = require('sequelize');

module.exports = class MOTIE_STIX_HISTORY extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            date_time: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            tableName: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            tableData: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'MOTIE_STIX_HISTORY',
            tableName: 'motie_stix_history',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};