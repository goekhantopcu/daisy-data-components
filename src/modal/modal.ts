export interface ModalOptions {
    id: string;
    closeOnEscape?: boolean;
    closeOnOutside?: boolean;
    disableOutsideScroll?: boolean;
    wrapperClasses?: string;
    outerClasses?: string;
    actionClasses?: string;
}

export class Modal {
    private readonly id: string;
    readonly options?: ModalOptions;

    constructor(id: string, options?: ModalOptions) {
        this.id = id;
        this.options = options ?? {
            id: id,
            closeOnEscape: true,
            closeOnOutside: true,
            disableOutsideScroll: true
        };
    }

    open() {
        this.element.checked = true;
        this.toggleOutsideScroll();
    }

    close() {
        this.element.checked = false;
        this.toggleOutsideScroll();
    }

    isVisible(): boolean {
        return this.element.checked;
    }

    isHidden(): boolean {
        return !this.element.checked;
    }

    get element(): HTMLInputElement {
        const element = document.getElementById(this.id) as HTMLInputElement;
        if (!element) {
            throw new Error(`There is no Modal with id='${this.id}'`);
        }
        return element;
    }

    private toggleOutsideScroll() {
        if (!this.options?.disableOutsideScroll) {
            return;
        }
        const bodyElements = document.getElementsByTagName("body");
        if (!bodyElements || bodyElements.length === 0) {
            return;
        }
        const bodyElement = bodyElements[0];
        const newOverflowProperty = this.element.checked ? 'hidden' : 'auto';
        bodyElement.style.setProperty('overflow', newOverflowProperty);
    }

    destroy() {
        MODAL_INSTANCES.delete(this.id);
    }
}

const MODAL_INSTANCES = new Map<string, Modal>();

export function useModal(id: string, options?: ModalOptions): Modal {
    const cached = MODAL_INSTANCES.get(id);
    if (cached) {
        return cached;
    }
    const modal = new Modal(id, options);
    MODAL_INSTANCES.set(id, modal);
    return modal;
}

export function destroyModal(id: string) {
    const cached = MODAL_INSTANCES.get(id);
    if (!cached) {
        return;
    }
    cached.destroy();
}
