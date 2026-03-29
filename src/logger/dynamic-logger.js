const pino = require('pino');
const { getDailyLogPath } = require('./log-path');

class DynamicLogger {
    constructor(type, level = 'info') {
        this.type = type;
        this.level = level;

        this.stream = this.createStream();

        this.logger = pino(
            { level: this.level },
            this.stream
        );
    }

    createStream() {
        return pino.transport({
            target: 'pino-roll',
            options: {
                file: getDailyLogPath(this.type),
                frequency: 'daily',
                size: '10m',
                limit: { count: 7 }
            }
        });
    }

    get instance() {
        return this.logger;
    }
}

module.exports = DynamicLogger;