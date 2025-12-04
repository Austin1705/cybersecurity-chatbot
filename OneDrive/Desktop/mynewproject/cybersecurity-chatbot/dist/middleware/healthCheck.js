"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheck = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const logger = new logger_1.default();
class HealthCheck {
    constructor() {
        this.startTime = Date.now();
    }
    getStatus() {
        const memoryUsage = process.memoryUsage();
        const totalMemory = require('os').totalmem();
        const usedMemory = memoryUsage.rss;
        const memoryPercentage = (usedMemory / totalMemory) * 100;
        const checklist = {
            database: true,
            api: true,
            memory: memoryPercentage < 80 // Alert if over 80%
        };
        const isHealthy = Object.values(checklist).every(check => check);
        const status = isHealthy ? 'healthy' : memoryPercentage > 90 ? 'unhealthy' : 'degraded';
        return {
            status: status,
            timestamp: new Date().toISOString(),
            uptime: Math.floor((Date.now() - this.startTime) / 1000),
            memory: {
                used: Math.round(usedMemory / 1024 / 1024),
                total: Math.round(totalMemory / 1024 / 1024),
                percentage: Math.round(memoryPercentage * 100) / 100
            },
            cpu: Math.round(process.cpuUsage().user / 1000000 * 100) / 100,
            checklist
        };
    }
    registerHealthEndpoint(app) {
        // Enhanced health check endpoint with detailed information
        app.get('/api/health', (req, res) => {
            const health = this.getStatus();
            const statusCode = health.status === 'healthy' ? 200 :
                health.status === 'degraded' ? 503 : 500;
            res.status(statusCode).json(health);
            if (health.status !== 'healthy') {
                logger.logError(`Health check: ${health.status} - ${JSON.stringify(health.checklist)}`);
            }
        });
        // Metrics endpoint for monitoring
        app.get('/api/metrics', (req, res) => {
            const health = this.getStatus();
            res.json(Object.assign(Object.assign({}, health), { timestamp: new Date().toISOString() }));
        });
        // Status endpoint for simple checks
        app.get('/api/status', (req, res) => {
            const health = this.getStatus();
            res.json({
                status: health.status,
                uptime: health.uptime,
                timestamp: health.timestamp
            });
        });
        logger.logInfo('Health check endpoints registered');
    }
}
exports.HealthCheck = HealthCheck;
//# sourceMappingURL=healthCheck.js.map