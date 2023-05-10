import {App} from "vue";
import {EventEmitter} from "./index";

export class EventEmitterPlugin {
    static install(app: App) {
        const emitter = new EventEmitter();
        app.provide('emitter', emitter);
    }
}
