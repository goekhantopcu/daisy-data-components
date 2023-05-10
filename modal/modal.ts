export interface ModalOptions {
    closeOnEscape?: boolean;
    closeOnOutside?: boolean;
    disableOutsideScroll?: boolean;
}

export class Modal {
    readonly id: string;
    readonly options?: ModalOptions;

    constructor(id: string, options?: ModalOptions) {
        this.id = id;
        this.options = options ?? {
            closeOnEscape: true,
            closeOnOutside: true,
            disableOutsideScroll: true
        };
    }

    public open() {
        this.changeElement(true);
        this.toggleOutsideScroll();
    }

    public close() {
        this.changeElement(false);
        this.toggleOutsideScroll();
    }

    public isVisible(): boolean {
        return this.element.checked;
    }

    public isHidden(): boolean {
        return !this.element.checked;
    }

    private changeElement(value: boolean) {
        this.element.checked = value;
        const event = new InputEvent('change');
        this.element.dispatchEvent(event);
    }

    public get element(): HTMLInputElement {
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

    public destroy() {
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
