const Sequelize = require('sequelize');

module.exports = class MOTIE_ASSET extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            assetId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            assetNm: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            stationId: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            powerGenId: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            hostInfo: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            mnufcturCor: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            assetType: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            assetProtocol: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            assetSnNum: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            assetFirmwareVer: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            assetModelNm: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            assetPosition: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            assetHogiCode: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            assetHighClassCode: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            assetClassCode: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            responsibilityUser: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            operatorUser: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            operatorDeptId: {
                type: Sequelize.STRING(11),
                allowNull: true,
            },
            acquireDate: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            assetUseYsno: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            assetMacAddr: {
                type: Sequelize.STRING(45),
                allowNull: true,
            },
            assetImportanceId: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            os: {
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
            state: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: 'C',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'MOTIE_ASSET',
            tableName: 'motie_asset',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};