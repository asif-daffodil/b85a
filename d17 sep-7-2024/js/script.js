const dateTime = document.querySelector(".date");
const time = document.querySelector(".time");

const clock = () => {
    const date = new Date();

    const getFullMonth = date.toLocaleString('default', { month: 'long' });
    const getDay = date.getDate().toString().padStart(2, '0');
    const getFullYear = date.getFullYear();
    const FullDate = `${getFullMonth} ${getDay}, ${getFullYear}`;
    dateTime.innerHTML = FullDate;

    const getHours = parseInt(date.toLocaleString('default', { hour: "2-digit", hour12: true }), 10).toString().padStart(2, '0');
    const getMinutes = date.getMinutes().toString().padStart(2, '0');
    const getSeconds = date.getSeconds().toString().padStart(2, '0');
    const getAmPm = date.toLocaleString('default', { hour: 'numeric', hour12: true }).split(' ')[1];
    const FullTime = `${getHours}:${getMinutes}:${getSeconds} ${getAmPm}`;
    time.innerHTML = FullTime;
}

clock();    

setInterval(clock, 1000);