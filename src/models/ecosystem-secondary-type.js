'use strict';

module.exports = (sequelize, DataTypes) => {
    const EcosystemSecondaryType = sequelize.define(
        'EcosystemSecondaryType',
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            publicId: {
                type: DataTypes.CHAR(36),
                allowNull: false,
                unique: true,
                field:'public_id'
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ecosystemPrimaryTypeId: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field:'ecosystem_primary_type_id'
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field:'created_at'
            },
            updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field:'updated_at'
            }
        },
        {
            tableName: 'ecosystem_secondary_types',
            timestamps: true,
            underscored: true,
        }
    );
    EcosystemSecondaryType.associate = models => {
        EcosystemSecondaryType.belongsTo(models.EcosystemPrimaryType, { foreignKey: 'ecosystemPrimaryTypeId', as: 'ecosystemPrimaryType' });
        EcosystemSecondaryType.hasMany(models.EcosystemTertiaryType, { foreignKey: 'ecosystemTertiaryTypeId', as: 'ecosystemTertiaryType' });
    };
    return EcosystemSecondaryType;
};
