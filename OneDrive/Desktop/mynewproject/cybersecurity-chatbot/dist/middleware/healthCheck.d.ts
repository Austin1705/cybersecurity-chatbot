import { Express } from 'express';
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
export declare class HealthCheck {
    private startTime;
    getStatus(): HealthStatus;
    registerHealthEndpoint(app: Express): void;
}
//# sourceMappingURL=healthCheck.d.ts.map