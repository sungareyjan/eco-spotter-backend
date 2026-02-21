'use strict';

module.exports = (sequelize, DataTypes) => {
    const ObservationImage = sequelize.define('ObservationImage', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        publicId: {
            type: DataTypes.CHAR(36),
            allowNull:false,
            unique:true,
            field:'public_id'
        },
        observationId: {
            type: DataTypes.BIGINT,
            allowNull:false,
            field: 'observation_id',
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull:false,
            field:'image_path'
        },
        thumbnailPath:{
            type: DataTypes.STRING,
            allowNull:true,
            field:'thumbnail_path'
        },
        mimeType:{
            type: DataTypes.STRING(20),
            allowNull:true,
            field:'mime_type'
        }
    }, {
        tableName: 'observation_images',
        underscored: true,
        timestamps: true
    });

    ObservationImage.associate = models => {
        ObservationImage.belongsTo(models.Observation, { as: 'observation', foreignKey: 'observationId' });
    };

    return ObservationImage;
};
