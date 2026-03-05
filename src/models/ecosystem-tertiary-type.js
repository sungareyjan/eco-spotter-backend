'use strict';

module.exports = (sequelize, DataTypes) => {
    const EcosystemTertiaryType = sequelize.define(
        'EcosystemTertiaryType',
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

            // ecosystemSecondaryTypeId: {
            //     type: DataTypes.BIGINT,
            //     allowNull: true,
            //     field:'ecosystem_secondary_type_id'
            // },
            ecosystemPrimaryType: {
                type: DataTypes.STRING,
                allowNull: true,
                field:'ecosystem_primary_type'
            },
            ecosystemSecondaryType: {
                type: DataTypes.STRING,
                allowNull: true,
                field:'ecosystem_secondary_type'
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            keyCharacteristics: {
                type: DataTypes.TEXT,
                allowNull: true,
                field:'key_characteristics'
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
            tableName: 'ecosystem_tertiary_types',
            timestamps: true,
            underscored: true,
        }
    );
    EcosystemTertiaryType.associate = models => {
        // EcosystemTertiaryType.belongsTo(models.EcosystemSecondaryType, { foreignKey: 'ecosystemSecondaryTypeId', as: 'ecosystemSecondaryType' });
        EcosystemTertiaryType.hasMany(models.EcosystemSpecificType, { foreignKey: 'ecosystemTertiaryTypeId', as: 'ecosystemSpecificType' });
    };
    return EcosystemTertiaryType;
};
