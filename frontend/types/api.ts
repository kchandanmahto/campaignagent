export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface HealthResponse {
    status: string;
}