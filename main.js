import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const weekContainer = document.querySelector("#week-container");
const preButton = document.querySelector("#pre-button");
const nextButton = document.querySelector("#next-button");
const addLessonButton = document.querySelector("#addLessonButton");
const lessonNameInput = document.querySelector("#lessonName");
const lessonDateInput = document.querySelector("#lessonDate");
const lessonDurationInput = document.querySelector("#lessonDuration");


const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let weekNumberState = moment().isoWeek();
console.log(weekNumberState)

const lessonState = [];

const firstLesson = {
    id:1,
    name: "Software Security",
    date: moment(),
    duration: 45
}
const secondLesson = {
    id:2,
    name: "DSA",
    date: moment(),
    duration: 60
}
const thirdLesson = {
    id:3,
    name: "Discrete Mathematics",
    date: moment().add(1, 'days'),
    duration: 40
}
const fourthLesson = {
    id:4,
    name: "Calculus",
    date: moment().subtract(1, 'days'),
    duration: 45
}
const fifthLesson = {
    id:5,
    name:"Physic",
    date: moment().add(3, 'days'),
    duration: 45
}

lessonState.push(firstLesson, secondLesson, thirdLesson,fourthLesson, fifthLesson);

nextButton.addEventListener("click", () => {
    weekNumberState = weekNumberState + 1; 
    renderWeek(weekNumberState)
});

 preButton.addEventListener("click", () => {
    weekNumberState = weekNumberState - 1; 
    renderWeek(weekNumberState)
 });  

 addLessonButton.addEventListener("click", () => {
     const lessonName = lessonNameInput.value;
     const lessonDate = lessonDateInput.value;
     const lessonDuration = lessonDurationInput.value;

     const lessonDateObject = moment(new Date(lessonDate));
     const newLesson = createLesson(lessonName, lessonDateObject, lessonDuration);

     console.log({lessonDate})
     console.log({lessonDateObject})

     lessonState.push(newLesson);
     console.log(newLesson)
     weekNumberState = lessonDateObject.isoWeek();
     console.log(weekNumberState)
     renderWeek(weekNumberState);
     lessonDateInput.value = '';
     lessonNameInput.value = '';
     lessonDurationInput.value = '';
 });

 function createLesson(lessonName, lessonDate, lessonDuration){
     const lesson = {
         id:uuidv4(),
         name:lessonName,
         date:lessonDate,
         duration: lessonDuration
     }
     return lesson;

 }

function renderWeek(weekNumber){

    weekContainer.innerHTML = '';

    days.forEach((day, index) => {
    const p = document.createElement("p");
    p.className = "column";
    const ul = document.createElement("ul");
    const div = document.createElement("div");
    div.className = "day-header";
    ul.className = "lessons-container";
    
    const currentWeekStart = moment().isoWeek(weekNumber).startOf("isoWeek");
    console.log(currentWeekStart)
    div.textContent = `${day} ${currentWeekStart.add(index, "days").format("DD")}`;
    p.appendChild(div);

    const lessons = lessonState.filter((lesson) => {
        if(isInCurrentWeek(lesson.date) && isInCurrentDay(lesson.date, index)) {
            return lesson;
        }  
    })
    
    lessons.sort((a, b) => {
        if(a.date.isBefore(b.date)){
            return -1;
        } 
        return 1;
    })
    

     lessons.forEach((lesson) => {
          const li = document.createElement("li");
          li.className = "lesson-item";
          const lessonDate = moment(lesson.date);
          li.textContent = `${lesson.name} ${lesson.date.format("HH:mm")} - ${(lessonDate.add(lesson.duration, 'minute').format("HH:mm"))}` 
          ul.appendChild(li); 
        })

        p.appendChild(ul);

    weekContainer.appendChild(p);

  });

}
function isInCurrentWeek(lessonDate) {
  return lessonDate.isoWeek() ===  weekNumberState;
}

function isInCurrentDay(lessonDate, index) {
    return lessonDate.day() === index + 1;
}

renderWeek(weekNumberState);

