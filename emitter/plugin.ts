import type {App} from "vue";
import EventEmitter from "./index";

export const EventEmitterPlugin = (app: App) => {
    const emitter = new EventEmitter();
    app.provide('emitter', emitter);
}
