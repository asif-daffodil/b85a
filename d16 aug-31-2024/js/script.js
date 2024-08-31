// apply default css to * element

document.querySelectorAll('*').forEach((e) => {
    e.style.margin = 0;
    e.style.padding = 0;
    e.style.boxSizing = 'border-box';
});

const btn1 = document.querySelector('#btn1');
const heading1 = document.querySelector('#heading1');

btn1.addEventListener('click', () => {
    heading1.textContent = 'Hello Universe';
});

heading1.addEventListener('mouseover', () => {
    heading1.textContent = 'Hello World';
});

const btnOn = document.querySelector('#btnOn');
const btnOff = document.querySelector('#btnOff');
const bulb = document.querySelector('#bulb');

btnOn.addEventListener('click', () => {
    bulb.src = './images/pic_bulbon.gif';
});

btnOff.addEventListener('click', () => {
    bulb.src = './images/pic_bulboff.gif';
});