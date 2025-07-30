export interface IRegisterResponse {
    success: boolean;
    message: string;
    data: {
        user_id: number;
        event_id: number;
    };
}