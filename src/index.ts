import {
  BehaviorSubject,
  Observable,
  Observer,
  Subject,
  of,
  scan,
  take,
  tap,
} from "rxjs";

import reactive from "./reactive";
import { Effect } from './reactive';



// counter
const nameView = document.getElementById("name-view");
const counterElm = document.getElementById("counter");
const incButton = document.getElementById("inc");
incButton?.addEventListener("click", () => {
   reactiveValue.set(reactiveValue.get() + 1);
})
// // //                  // reactive value   // when changed update view
 let reactiveValue  = reactive(0 ,[(v) => counterElm!.innerText = v.toString(), (v) => nameView!.innerText = v.toString()]);

// person input
const nameInput = document.getElementById("name-input") as HTMLInputElement;
const ageInput = document.getElementById("age-input") as HTMLInputElement;

// // // person view
const ageView = document.getElementById("age-view");
const updateButton = document.getElementById("update");

type Person = { name: string; age: number };
const person = { name: "John", age: 30 };

const person$ = reactive(person, [(v) => nameView!.innerText = v.name, (v) => ageView!.innerText = v.age.toString()]);

nameInput.addEventListener("input", (e) => {
  person$.set({ ...person$.get(), name: nameInput.value });
});
ageInput.addEventListener("input", (e) => {
  person$.set({ ...person$.get(), age: parseInt(ageInput.value) });
});
