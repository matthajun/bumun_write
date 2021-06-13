const Sequelize = require('sequelize');

module.exports = class MOTIE_RULE_MULTI extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            multiId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            stationId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            powerGenId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            multiName: {
                type: Sequelize.STRING(100),
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
            multiContent: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            chk: {
                type: Sequelize.STRING(255),
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
            modelName: 'MOTIE_RULE_MULTI',
            tableName: 'motie_rule_multi',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
