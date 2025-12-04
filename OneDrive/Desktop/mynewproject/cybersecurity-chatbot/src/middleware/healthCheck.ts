import { Express } from 'express';
import Logger from '../utils/logger';

const logger = new Logger();

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  cpu: number;
  checklist: {
    database: boolean;
    api: boolean;
    memory: boolean;
  };
}

export class HealthCheck {
  private startTime: number = Date.now();

  public getStatus(): HealthStatus {
    const memoryUsage = process.memoryUsage();
    const totalMemory = require('os').totalmem();
    const usedMemory = memoryUsage.rss;
    const memoryPercentage = (usedMemory / totalMemory) * 100;

    const checklist = {
      database: true, // JSON files are always available
      api: true,      // API is responding
      memory: memoryPercentage < 80 // Alert if over 80%
    };

    const isHealthy = Object.values(checklist).every(check => check);
    const status = isHealthy ? 'healthy' : memoryPercentage > 90 ? 'unhealthy' : 'degraded';

    return {
      status: status as 'healthy' | 'degraded' | 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      memory: {
        used: Math.round(usedMemory / 1024 / 1024), // MB
        total: Math.round(totalMemory / 1024 / 1024), // MB
        percentage: Math.round(memoryPercentage * 100) / 100
      },
      cpu: Math.round(process.cpuUsage().user / 1000000 * 100) / 100,
      checklist
    };
  }

  public registerHealthEndpoint(app: Express): void {
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
      res.json({
        ...health,
        timestamp: new Date().toISOString()
      });
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
