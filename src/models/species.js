'use strict';

module.exports = (sequelize, DataTypes) => {
    const Species = sequelize.define('Species', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        publicId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            field: 'public_id',
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING
        },
        scientificName: {
            type: DataTypes.STRING,
            allowNull:false,
            field:'scientific_name'
        },
        ecosystemSpecificTypeId:{
            type: DataTypes.BIGINT,
            allowNull:true,
            field:'ecosystem_specific_type_id'
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
    }, {
        tableName: 'species',
        underscored: true,
        timestamps: true
    });

    Species.associate = models => {
        Species.hasMany(models.Observation, { as: 'observations', foreignKey: 'speciesId' });
        Species.belongsTo(models.EcosystemSpecificType, { as: 'ecosystemSpecificType', foreignKey: 'ecosystemSpecificTypeId' });
    };

    return Species;
};
