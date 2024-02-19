import { BehaviorSubject, Subscription } from "rxjs";

export type Effect<T> = (v: T) => void;

const reactive = <T>(value: T, effects: Effect<T>[]) => {
  let state: BehaviorSubject<T> = new BehaviorSubject(value);
  let sbs: Subscription;
  return {
    state: state,
    set: (val: T) => {
      // console.log("effect:", effect);
      state.next(val);
      effects.forEach((effect) => effect(val));
      return state.value;
    },
    get: () => {
      return state.value;
    },

    view: (sbs = state.subscribe((v) =>
      effects.forEach((effect) => effect(v))
    )),
    destroy: () => {
      sbs.unsubscribe();
    },
  };
};

export default reactive;
