export class DataModalControl {
    open(id: string) {
        const element = this.element(id);
        element.checked = true;
        this.toggleOutsideScroll(id);
    }

    close(id: string) {
        const element = this.element(id);
        element.checked = false;
        this.toggleOutsideScroll(id);
    }

    isVisible(id: string): boolean {
        const element = this.element(id);
        return element.checked;
    }

    isHidden(id: string): boolean {
        const element = this.element(id);
        return !element.checked;
    }

    element(id: string): HTMLInputElement {
        const element = document.getElementById(id) as HTMLInputElement;
        if (!element) {
            throw new Error(`There is no Modal with id='${id}'`);
        }
        return element;
    }

    private toggleOutsideScroll(id: string) {
        const element = this.element(id);
        const qualifiedName = 'data-disable-outside-scroll';
        const disableOutsideScroll = 'true' == element.getAttribute(qualifiedName)?.toLowerCase();
        if (!disableOutsideScroll) {
            return;
        }
        const bodyElements = document.getElementsByTagName("body");
        if (!bodyElements || bodyElements.length === 0) {
            return;
        }
        const bodyElement = bodyElements[0];
        const newOverflowProperty = element.checked ? 'hidden' : 'auto';
        bodyElement.style.setProperty('overflow', newOverflowProperty);
    }
}

export default new DataModalControl();
