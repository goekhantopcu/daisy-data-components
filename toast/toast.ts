export interface Toast {
    id: string;
    message: string;
    classes: string;
}

export interface ToastEvent {
    id?: string;
    message: string;
    type?: 'error' | 'info' | 'success' | 'warning';
    duration?: number;
    styling?: string;
}
