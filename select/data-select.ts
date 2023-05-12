export type DataSelectOption<T> = {
    label: string;
    value?: T;
    disabled?: boolean;
    selected?: boolean;
};

export type DataSelectOptions<T> = Array<DataSelectOption<T>>;
