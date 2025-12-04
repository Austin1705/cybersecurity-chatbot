export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserSession {
    userId: string;
    sessionId: string;
    createdAt: Date;
    expiresAt: Date;
}
//# sourceMappingURL=user.d.ts.map