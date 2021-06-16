//This file contains functionality related to validating and submitting form.
import {TaskManager} from './index.js';
//Defining task Button
let addTaskBtn = document.querySelector("#addTaskBtn");
addTaskBtn.addEventListener('click',addTask);

//return values for validate functions
let validationSuccessful = true;
let validationFailed = false;

//Instantiate a task planner
let taskPlanner = new TaskManager();

//Extract Form input
let inputTask = document.querySelector("#inputTask");
//inputTask.addEventListener("input",validateTaskName);
inputTask.addEventListener("keyup",validateTaskName);
let statusDropdown = document.querySelector("#statusDropdown");
//statusDropdown.addEventListener("input",validateStatus);
statusDropdown.addEventListener("keyup",validateStatus);
let inputAssignee = document.querySelector("#inputAssignee");
inputAssignee.addEventListener("keyup",validateAssignee);
let dueDate = document.querySelector("#dueDate");
dueDate.addEventListener("keyup",validateDueDate);
let description = document.querySelector("#description");
description.addEventListener("keyup",validateDescriptionBox);


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
    let inputDate = new Date(dueDate.value);
    let todaysDate = new Date();
    if(inputDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0))
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

//helper function to validate form fields
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
console.log("it works");
    if(validateForm())
    {        
    //create a new object by storing the values and call the add task function
    taskPlanner.addTask(inputTask.value,statusDropdown.value,inputAssignee.value,dueDate.value,description.value);
    console.log(taskPlanner.tasks);
    taskPlanner.render();
    let form = document.querySelector("#form");
    form.reset();
    
    }

}


// taskName, status, assignee, dueDate, description = ""
let todoColumn = document.querySelector("#doList");
todoColumn.addEventListener("click", displayUpdateTask);
let inProgressColumn = document.querySelector("#inProgressList");
inProgressColumn.addEventListener("click", displayUpdateTask);
let reviewColumn = document.querySelector("#reviewList");
reviewColumn.addEventListener("click", displayUpdateTask);
let doneColumn = document.querySelector("#doneList");
doneColumn.addEventListener("click", displayUpdateTask);


//helper function to populate form fields with selected task card
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
    //alert(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id);
  //  let taskForm = document.querySelector("#taskform");

    //document.getElementById('addTaskBtn').hidden = true;
    document.getElementById('addTaskBtn').style.display = "none";
    document.getElementById('updateTaskBtn').style.display = "block";
    let updateTaskId = Number(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id);
    console.log("in updateTask task id is " + updateTaskId);
    let task = taskPlanner.getTaskById(updateTaskId);
    populateFormToBeUpdated(task);
    let updateTaskBtn = document.querySelector("#updateTaskBtn");
    //updateTaskBtn.addEventListener("click",updateTask(updateTaskId))  
    updateTaskBtn.addEventListener("click",(event) =>{updateTask(event,updateTaskId)}) ; 

//    let form = document.querySelector("#form");
  
    

}

//event handler for update button in form
function updateTask(event,updateTaskId){
    console.log("Updating Task now");
    if(validateForm())
    {        
    //create a new object by storing the values and call the add task function
    taskPlanner.updateTask(updateTaskId,inputTask.value,statusDropdown.value,inputAssignee.value,dueDate.value,description.value);
    console.log(taskPlanner.tasks);
    taskPlanner.render();
    document.getElementById('updateTaskBtn').style.display = "none";

    document.getElementById('addTaskBtn').style.display = "block";
    
    // let hideUpdate = document.querySelector('#updateCardBtn');
    // if(document.querySelector("#statusDropdown").value == 'Done'){
    // hideUpdate.style.display = 'none';
    // }

    let form = document.querySelector("#form");
    form.reset();

    }
}