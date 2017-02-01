import { app } from './app.js'
import { Test } from './modules/test.module.js'
import exp, {pi, e} from "./lib/mathplus.js";

app.run();
console.log("test: " + new Test('hello').display());
console.log("exp:" + exp(2));
console.log("pi:" + pi);


let a = [1,2,3].map(n => n + 2);
console.log(a);
