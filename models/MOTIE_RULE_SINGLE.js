const Sequelize = require('sequelize');

module.exports = class MOTIE_RULE_SINGLE extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            ruleId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            ruleName: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            stationId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            powerGenId: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            ruleCategory: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ruleContent: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            ruleInfo: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            chk: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ruleQuery: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            alarmYn: {
                type: Sequelize.TINYINT(1),
                allowNull: true,
            },
            fstUser: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            fstDttm: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            lstUser: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            lstDttm: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            ruleGubn: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ruleType: {
                type: Sequelize.STRING(100),
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
            modelName: 'MOTIE_RULE_SINGLE',
            tableName: 'motie_rule_single',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};