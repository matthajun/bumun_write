const Sequelize = require('sequelize');

module.exports = class MOTIE_ASSET_IP extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            assetId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            assetIp: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            keeperKey: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            unitId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            makeId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            powerGenId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            plantId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            deviceId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            fstUser: {
                type: Sequelize.STRING(45),
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
            trans_tag: {
                type: Sequelize.STRING(5),
                allowNull: false,
                defaultValue: 'C',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'MOTIE_ASSET_IP',
            tableName: 'motie_asset_ip',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};