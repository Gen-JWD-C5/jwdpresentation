//This file contains functionality related to validating and submitting form.

//Defining task Button
let addTaskBtn = document.querySelector("#addTaskBtn");

addTaskBtn.addEventListener('click',addTask);
let inputTask = document.querySelector("#inputTask");
inputTask.addEventListener('mouseout',validateTaskName);

//Validation of Task Name for being blank or not meeting length requirements
function validateTaskName() 
{
    let minTaskLength = 2; //to be set by user
    let maxTaskLength = 25; //to be set by user
    //let inputTask = document.querySelector("#inputTask");
   
    if (inputTask.value === "")
    {
        inputTask.style.borderColor = "red";
        let errMsg = document.querySelector("#errMsg");
        errMsg.style.color = "red";
        errMsg.innerHTML = `Task Name cannot be left blank.`;
    }else if((inputTask.value.length < minTaskLength) || (inputTask.value.length > maxTaskLength))
    {
        inputTask.style.borderColor = "red";
        let errMsg = document.querySelector("#errMsg");
        errMsg.style.color = "red";
        errMsg.innerHTML = `Task Name can only be between 2-25 characters.`;
    }else //validation successful
    {
        errMsg.innerHTML = "";
        inputTask.style.borderColor = "";
    }
}

//Validation of Status
function validateStatus()
{
    let statusDropdown = document.querySelector("#statusDropdown");
   
    if(statusDropdown.value === "Choose Status")
    {
        statusDropdown.style.borderColor = "red";   
    }else //successfully validated
    {
        statusDropdown.style.borderColor = "";
    }
}

//Validation of Assignee
function validateAssignee()
{
    let assigneeDropdown = document.querySelector("#assigneeDropdown");
   
    if(assigneeDropdown.value === "Assignee")
    {
        assigneeDropdown.style.borderColor = "red";   
    }else //successfully validated
    {
        assigneeDropdown.style.borderColor = "";
    }
}

//Validation of Due Date
function validateDueDate()
{
    let dueDate = document.querySelector("#dueDate");
    let inputDate = new Date(dueDate.value);
    let todaysDate = new Date();
    if(inputDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0))
    {
        dueDate.style.borderColor = "red";
    }else //validation successful
    {
        dueDate.style.borderColor = "";
    }

}


function addTask() 
{
    validateTaskName();
    validateStatus();
    validateAssignee();
    validateDueDate();
    //create a new object by storing the values and call the add task function
}

