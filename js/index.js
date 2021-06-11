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
rendor()
{
    let taskHtmlListToDo = [];
    let taskHtmlListInProgress = [];
    let taskHtmlListReview = [];
    let taskHtmlListDone = [];
    for(let task of this._tasks)
    {
        let date = new Date(task.dueDate);
        //let formattedDate = convert date to string
        let taskHtml = createTaskHtml();
        switch(task.status)
        {
           case 'To Do':
                taskHtmlListToDo.push(taskHtml);
                break;
            case 'In Progress':
                taskHtmlListInProgress.push(taskHtml);
                break;
            case 'Reveiw':
                taskHtmlListReview.push(taskHtml);
                break
            case 'Done':
                taskHtmlListDone.push(taskHtml);
                break;

        }
    }
    let todoColumn = document.querySelector("#todoColumn");
    todoColumn.innerHTML = taskHtmlListToDo.join('/n');
    let inProgressColumn = document.querySelector("#inProgressColumn");
    inProgressColumn = taskHtmlListInProgress.join('/n');
    let reviewColumn = document.querySelector("#reviewColumn");
    reviewColumn = taskHtmlListReview.join('/n');
    let doneColumn = document.querySelector("#doneColumn");
    doneColumn = taskHtmlListDone.join('/n');
}

    //function deleteTask
    //blank function as of now 
const deleteTask = () => {

}

    //function updateStatus
    //blank function as of now
const updateStatus = () => {

}
export{TaskManager};