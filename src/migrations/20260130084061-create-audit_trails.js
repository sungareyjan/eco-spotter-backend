'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('audit_trails', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },

            timestamp: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            browser: Sequelize.STRING,
            browser_version: Sequelize.STRING,
            entity_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            ip: Sequelize.STRING,
            log: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            module_code: {
                type: Sequelize.STRING,
                allowNull: false
            },
            //  Store JSON as TEXT
            old_data: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            os:{
                type:Sequelize.STRING,
                field:'os'
            },
            remarks: Sequelize.TEXT,

            request: {
                type: Sequelize.TEXT,
                allowNull: true
            },

            //  ENUM replaced with STRING
            status: {
                type: Sequelize.STRING,
                allowNull: false
            },

            username: Sequelize.STRING,
            role: Sequelize.STRING,

            device: {
                type: Sequelize.STRING,
                allowNull: true
            },
            device_unit: {
                type: Sequelize.STRING,
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('SYSDATETIMEOFFSET()'),
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('SYSDATETIMEOFFSET()'),
            },
        });

        //  Indexes
        await queryInterface.addIndex('audit_trails', ['username'], { name: 'idx_audit_username' });
        await queryInterface.addIndex('audit_trails', ['module_code'], { name: 'idx_audit_module_code' });
        await queryInterface.addIndex('audit_trails', ['timestamp'], { name: 'idx_audit_timestamp' });
        await queryInterface.addIndex('audit_trails', ['device'], { name: 'idx_audit_device' });

        //  Enforce valid JSON
        await queryInterface.sequelize.query(`
            ALTER TABLE audit_trails
            ADD CONSTRAINT chk_old_data_json
            CHECK (old_data IS NULL OR ISJSON(old_data) = 1);
        `);

        await queryInterface.sequelize.query(`
            ALTER TABLE audit_trails
            ADD CONSTRAINT chk_request_json
            CHECK (request IS NULL OR ISJSON(request) = 1);
        `);
    },

    async down(queryInterface) {
        await queryInterface.removeIndex('audit_trails', 'idx_audit_username');
        await queryInterface.removeIndex('audit_trails', 'idx_audit_module_code');
        await queryInterface.removeIndex('audit_trails', 'idx_audit_timestamp');

        await queryInterface.dropTable('audit_trails');
    }
};