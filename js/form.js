//This file contains functionality related to validating and submitting form.

import {TaskManager} from './index.js';

//Defining task Button from form
let addTaskBtn = document.querySelector("#addTaskBtn");
addTaskBtn.addEventListener('click',addTask);



//return values for  form input validate functions for code readability
let validationSuccessful = true;
let validationFailed = false;

//to sustain its value in event handler function for update button in form when a task is updated
let updateTaskId = 0;

//Instantiate a task planner
let taskPlanner = new TaskManager();
taskPlanner.load(); // calling function to load tasks from local storage
taskPlanner.render();  // calling function to render from local storage

//Extract Form input fields
//used to populate form for updating tasks
//used to enable add button only when all fields are filled
let inputTask = document.querySelector("#inputTask");
inputTask.addEventListener("input",enableSubmitButton);

let statusDropdown = document.querySelector("#statusDropdown");
statusDropdown.addEventListener("input",enableSubmitButton);

let inputAssignee = document.querySelector("#inputAssignee");
inputAssignee.addEventListener("input",enableSubmitButton);

let dueDate = document.querySelector("#dueDate");
dueDate.addEventListener("input",enableSubmitButton);

let description = document.querySelector("#description");
description.addEventListener("input",enableSubmitButton);

//it will enable add button on form only when all fields have a value
function enableSubmitButton(){
    if(inputTask.value && statusDropdown.value && inputAssignee.value && dueDate.value && description.value){
        //enable button
        document.getElementById('addTaskBtn').disabled = false;
    }
}

//Validation of Task Name for being blank or not meeting length requirements
function validateTaskName() 
{
    let minTaskLength = 5; //to be defined by user
    let maxTaskLength = 100; //to be defined by user
       
    if (inputTask.value === "")
    {
        inputTask.style.borderColor = "red";
        let errMsg = document.querySelector("#errMsg");
        errMsg.style.color = "red";
        errMsg.innerHTML = `Please provide a Task Name.`;
        console.log(`Please provide a Task Name.--------------`);
        return validationFailed;
    }else if((inputTask.value.length < minTaskLength) || (inputTask.value.length > maxTaskLength))
    {
        inputTask.style.borderColor = "red";
        let errMsg = document.querySelector("#errMsg");
        errMsg.style.color = "red";
        errMsg.innerHTML = `Task Name can only be between ${minTaskLength}-${maxTaskLength} characters.`;
        return validationFailed;
    }else //validation successful
    {
        errMsg.innerHTML = "";
        inputTask.style.borderColor = "";
        return validationSuccessful;
    }
}

//Validation of Status
function validateStatus()
{
    
    let errMsg = document.querySelector("#statusErrMsg");
   
    if(statusDropdown.value === "Choose Status")
    {
        statusDropdown.style.borderColor = "red";
        errMsg.style.color = "red";
        errMsg.innerHTML = `Please choose Status`; 
        return validationFailed;  
    }else //successfully validated
    {
        statusDropdown.style.borderColor = "";
        errMsg.innerHTML = ``;
        return validationSuccessful;
    }
}

//Validation of Assignee
function validateAssignee()
{
    
    let minAssigneeLength = 5;//defined by user
    let maxAssigneeLength = 15;//defined by user
    let errMsg = document.querySelector("#assigneeErrMsg");
    if(inputAssignee.value === "")
    {
        inputAssignee.style.borderColor = "red";   
        
        errMsg.style.color = "red";
        errMsg.innerHTML = `Please add Assignee`;
        return validationFailed;
    }
    else if((inputAssignee.value.length < minAssigneeLength) || (inputAssignee.value.length > maxAssigneeLength))
    {
        inputAssignee.style.borderColor = "red";   
        errMsg.style.color = "red";
        errMsg.innerHTML = `Assignee can only be between ${minAssigneeLength}-${maxAssigneeLength} characters!`;
        return validationFailed;
    }
    else //successfully validated
    {
        inputAssignee.style.borderColor = "";
        errMsg.innerHTML = ``;
        return validationSuccessful;
    }
}

//Validation of Due Date
function validateDueDate()
{
    
    let errMsg = document.querySelector("#dateErrMsg");
    console.log("Due date is " + dueDate.value);
    let inputDate = new Date(dueDate.value);
    let todaysDate = new Date();

    if((dueDate.value === "") || 
    (inputDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)))
    {
        dueDate.style.borderColor = "red";
        errMsg.style.color = "red";
        errMsg.innerHTML = `Please select a valid Date`;
        return validationFailed;
    }else //validation successful
    {
        dueDate.style.borderColor = "";
        errMsg.innerHTML = ``;
        return validationSuccessful;
    }

}

//validate description field
function validateDescriptionBox()
{
    
    let errMsg = document.querySelector("#descriptionErrMsg");
    let minDescLength = 5; //defined by user
    let maxDescLength = 200; //defined by user
    
    if(description.value === "")
    {
        description.style.borderColor = "red";   
        errMsg.style.color = "red";
        errMsg.innerHTML = `Please add Description`;
        return validationFailed;
    }
    else if((description.value.length < minDescLength) || (description.value.length > maxDescLength))
    {
        description.style.borderColor = "red";   
        errMsg.style.color = "red";
        errMsg.innerHTML = `Description can only be between ${minDescLength}-${maxDescLength} characters!`;
        return validationFailed;
    }
    else //successfully validated
    {
        description.style.borderColor = "";
        errMsg.innerHTML = ``;
        return validationSuccessful;
    }    
}

//helper function to validate form fields while adding and updating tasks
function validateForm()
{
    
     return(validateTaskName() && 
     validateStatus() && 
     validateAssignee() && 
     validateDueDate() && 
     validateDescriptionBox());
 }


//event handler for add task button in form
function addTask() 
{
console.log("in add task it works");

    if(validateForm())
    {        
    //call the add task function to add to task array
    taskPlanner.addTask(inputTask.value,statusDropdown.value,inputAssignee.value,dueDate.value,description.value);
    console.log(taskPlanner.tasks);
    
    // to save to local storage
    taskPlanner.save(); 

    //render tasks on page
    taskPlanner.render();
    
    clearForm();
    //disable add button to make form ready for adding next task
    document.getElementById('addTaskBtn').disabled = true;
    }

}


// To capture clicks for update and delete buttons on cards
//capture clicks on 4 columns and get event.target.id of buttons
let todoColumn = document.querySelector("#doList");
todoColumn.addEventListener("click", displayUpdateTask);
todoColumn.addEventListener("click",deleteTask);

let inProgressColumn = document.querySelector("#inProgressList");
inProgressColumn.addEventListener("click", displayUpdateTask);
inProgressColumn.addEventListener("click",deleteTask);

let reviewColumn = document.querySelector("#reviewList");
reviewColumn.addEventListener("click", displayUpdateTask);
reviewColumn.addEventListener('click',deleteTask);

let doneColumn = document.querySelector("#doneList");
doneColumn.addEventListener("click", displayUpdateTask);
doneColumn.addEventListener('click',deleteTask);



//helper function to populate form fields with selected task card to update
function populateFormToBeUpdated(task){
    console.log("in populateFormToBeUpdated ");
    console.log(task);
    inputTask.value = task.taskName;
    
    statusDropdown.value = task.status;
    inputAssignee.value = task.assignee;
    dueDate.value = task.dueDate;
    description.value = task.description;

}

//eventhandler for update button in cards
function displayUpdateTask(event){
    console.log("in display update task")

    if (event.target.id === "updateCardBtn"){
    //changes modal form to display update button and update title
    document.getElementById('updateTaskBtn').style.display = "block";
    document.getElementById('addTaskBtn').style.display = "none";       
    document.getElementById('formLabel').innerHTML = "Update Task";
    //grab task id from card body
     updateTaskId = Number(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id);
    console.log("*********in displayupdateTask task id is " + updateTaskId);
    let task = taskPlanner.getTaskById(updateTaskId);
    populateFormToBeUpdated(task);

    //capturing form Update button for updation in task array
    let updateTaskBtn = document.querySelector("#updateTaskBtn");
    console.log("before update eventlistenere function update task id is" + updateTaskId);
    updateTaskBtn.addEventListener("click", updateTaskArray) ;
  }
}
//event handler for update button in form
function updateTaskArray(){
    console.log("Updating Task now after update button pressed updateTaskId is " + updateTaskId);
    if(validateForm())
    {        
    //create a new object by storing the values and call the add task function
    taskPlanner.updateTask(updateTaskId,inputTask.value,statusDropdown.value,inputAssignee.value,dueDate.value,description.value);
    console.log(taskPlanner.tasks);
    taskPlanner.save(); // to save to local storage
    taskPlanner.render();
    //reset values
    updateTaskId = 0;
    clearForm();

    }
}

//to reset form
function clearForm(){
  
   let form = document.querySelector("#form");
   form.reset();
}

//after updating add task button refreshes the modal to addtask form
let addTaskBtnForModal = document.querySelector("#addTaskBtnForModal");
addTaskBtnForModal.addEventListener("click",resetTaskFormToAddTask);

//event handler for addTaskBtnForModal,it resets modal to add task
function resetTaskFormToAddTask(){
    //hide update button unhide add button and disable it
    document.getElementById('updateTaskBtn').style.display = "none";
    document.getElementById('addTaskBtn').style.display = "block";
    document.getElementById('formLabel').innerHTML = "Add Task";
    document.getElementById('addTaskBtn').disabled = true;
    clearForm();
}

//event handler for delete task button on task cards
function deleteTask(event) {
    
    console.log("clicked delete button")
    console.log(event.target.id);
    if (event.target.id === "deleteBtn") {
        console.log("deleting the task")
    // get the id for the task you want to target
   // let taskId = Number(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id);
   console.log(event.target.parentElement.parentElement.parentElement.parentElement.classList);
   
   let taskId = Number(event.target.parentElement.parentElement.parentElement.parentElement.id);
    console.log("deleting task with task id:" + taskId);
    // fire the delete function with task id
    taskPlanner.deleteTask(taskId);
    //save the new array
    taskPlanner.save();
    // render the new array
    taskPlanner.render();

    }
    // document.getElementById('updateTaskBtn').style.display = "none";

    // document.getElementById('addTaskBtn').style.display = "block";
}

