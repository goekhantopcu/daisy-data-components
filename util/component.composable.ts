import {computed} from "vue";
import type {WritableComputedRef} from "vue";

export function componentModel<T>(
    props: Record<string, any>,
    emits: any,
    name: string = 'modelValue'
): WritableComputedRef<T> {
    if (!props.hasOwnProperty(name)) {
        throw new Error(`There is no property for key='${name}'`);
    }
    return computed({
        get: () => props[name],
        set: (value: T) => emits(`update:${name}`, value)
    });
}
