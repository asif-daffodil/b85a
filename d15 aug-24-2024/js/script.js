var x = 35;
var x = 45;
x = 55;

let y = 35;
y = 36;

const z = 35;
// z = 36;
// console.log(x, y, z);

//  operators
/**
 * Arithmetic operators + - * / % ++ --
 * Assignment operators = += -= *= /= %=
 * Comparison operators == === != !== > < >= <=
 * Logical operators && || !
 * String operators +
 * ternary operator ? :
 * Type Operators
 */

//  Type Operators
// typeof
console.log(typeof x);

/*
function myFunc () {
    console.log("Hello");
}

const myFunc = function () {
    console.log("Hello");
} 
*/

const showMsg = document.getElementById("showMsg");

const myFunc = (msg = "Hello") => {
    showMsg.innerHTML = msg;
}

const myFunc2 = () => {
    const msg = showMsg.innerHTML;
    if(msg === "") {
        showMsg.innerHTML = "World";
    }else if (msg === "World") {
        showMsg.innerHTML = "Hello";
    }else if (msg === "Hello") {
        showMsg.innerHTML = "World";
    }else{
        showMsg.innerHTML = "";
    }
}

//  array
const cities = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi"];

console.log(cities[3]);
console.log(cities.length);
console.log(cities.indexOf("Sylhet"));
cities.push("Noyakhali", "Barishal");
cities.pop();
cities.shift();
cities.unshift("Feni", "Comilla");
console.log(cities);


