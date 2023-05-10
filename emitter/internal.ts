import {EventEmitterIdentifier, EventListener} from "./index";

/*#__PURE__*/
export const emitters = new Map<EventEmitterIdentifier, Set<EventListener<any>>>();
