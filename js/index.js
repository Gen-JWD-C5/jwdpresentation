// This file deals with class definition for task planner
//Structure for class:
class TaskManager {
    constructor(currentId = 0) {
        // initialize an empty array called tasks
        this._tasks = [];
        //initialize a currentId set to currentId
        this._currentId = currentId;
    };
    //getter for book array
    get tasks() {
        return this._tasks;
    };
    //setters for book array
    
    
    //function addTask
    addTask(taskName, status, assignee, dueDate, description = "") {
        const newTask ={
            id: ++this._currentId,
            taskName: taskName,
            status: status,
            assignee: assignee,
            dueDate: dueDate,
            description: description
        };

        return this._tasks.push(newTask);
    } ;
}
//arguments: taskName,status,assignee,dueDate,Description=""
    //default values for args
    //create instance of book array
    //push it to this._booksList
    //call render function--make it a blank function
    //test the whole code in this file for now

// const taskList = new TaskManager();

// taskList.addTask("work", "todo", "Kim", "18/06/2021", "I have to finish");
// taskList.addTask("jog", "in progress", "Kim", "18/06/2021", "try to start");
// console.log(taskList.tasks);
module.exports.TaskManager = TaskManager;
    //function deleteTask
    //blank function as of now 
const deleteTask = () => {

}

    //function updateStatus
    //blank function as of now
const updateStatus = () => {

}
export{TaskManager};