const myInfo = {
    name: "Asif Abir",
    city: "Dhaka",
    country: "Bangladesh",
    myFriends: ["Kabir", "Sakib", "Rakib"],
    mySkilss: {
        programming: ["JavaScript", "Python", "Java"],
        frameworks: ["React", "Django", "Spring Boot"],
        databases: ["MongoDB", "MySQL", "PostgreSQL"],
        tools: ["Git", "VS Code", "Jira"]
    },
    myFullInfo: () => {
        return `I am ${myInfo.name}. My best friend's name is ${myInfo.myFriends[1]}. I live in ${myInfo.city}, ${myInfo.country}. I am an expert on ${myInfo.mySkilss.programming[0]} and ${myInfo.mySkilss.frameworks[0]}. And my gender is ${myInfo.gender}`;
    }
}

myInfo.name = "Fuad Hossain";
myInfo.gender = "Male";

// console.log(myInfo.myFullInfo());

//  stringify the object
const myInfoString = JSON.stringify(myInfo);
// console.log(myInfoString);

// parse the object
const myInfoObj = JSON.parse(myInfoString);
console.log(myInfoObj);
