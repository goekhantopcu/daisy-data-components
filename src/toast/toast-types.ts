interface ToastNotification {
    id: string;
    message: string;
    classes: string;
}

interface ToastEvent {
    message: string;
    type?: 'error' | 'info' | 'success' | 'warning';
    duration?: number;
    styling?: string;
}

export type {ToastNotification, ToastEvent}
