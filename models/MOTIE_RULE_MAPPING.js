const Sequelize = require('sequelize');

module.exports = class MOTIE_RULE_MAPPING extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            mappingId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            multiId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            ruleId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            ruleGubn: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            trans_tag: {
                type: Sequelize.STRING(5),
                allowNull: false,
                defaultValue: 'C',
            },
            state:{
                type: Sequelize.STRING(5),
                allowNull: false,
                defaultValue: 'C',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'MOTIE_RULE_MAPPING',
            tableName: 'motie_rule_mapping',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};