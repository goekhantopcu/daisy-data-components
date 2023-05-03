export class DataModalControl {
    open(id: string) {
        const element = document.getElementById(id) as HTMLInputElement;
        if (!element) {
            throw new Error(`There is no Modal with id='${id}'`);
        }
        element.checked = true;
    }

    close(id: string) {
        const element = document.getElementById(id) as HTMLInputElement;
        if (!element) {
            throw new Error(`There is no Modal with id='${id}'`);
        }
        element.checked = false;
    }

    isVisible(id: string): boolean {
        const element = document.getElementById(id) as HTMLInputElement;
        if (!element) {
            throw new Error(`There is no Modal with id='${id}'`);
        }
        return element.checked;
    }

    isHidden(id: string): boolean {
        const element = document.getElementById(id) as HTMLInputElement;
        if (!element) {
            throw new Error(`There is no Modal with id='${id}'`);
        }
        return !element.checked;
    }
}

export default new DataModalControl();
