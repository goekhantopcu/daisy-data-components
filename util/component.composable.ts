import {computed, Ref, UnwrapRef} from "vue";

export function defineModel<T>(props: any, emits: any, name: string = 'modelValue'): Ref<UnwrapRef<T>> {
    if (!props.hasOwnProperty(name)) {
        throw new Error(`There is no property for key='${name}'`);
    }
    return computed({
        get: () => props[name],
        set: (value) => emits(`update:${name}`, value)
    });
}
