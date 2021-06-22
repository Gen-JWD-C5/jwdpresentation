// This file deals with class definition for task planner
// create card body to push into html
function createTaskHtml(taskName, status, assignee, dueDate, description, taskId)
{
  const html = `<li class="list-group-item">
    <div class="row mx-auto">
      <div class="col d-flex justify-content-center">
        <div id="${taskId}" class="card card-style rounded-0 mb-0">
          <div class="card-body d-flex flex-column">
            <div class="row">
              <div class="col">
                <div >
                <button
                type="button "
                class="btn btn-outline-secondary btn-sm"
                id="updateCardBtn"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
            data-bs-target="#taskform"
              >
                Update
              </button>
                </div>
              </div>
              <div class="col text-end">
              <button id= "deleteBtn" class=" btn btn-lg btn-outline-secondary"
              "></button>
              </div>
            </div>

            <h5 class="card-title mt-2">${taskName}</h5>
            <p class="card-text">
              ${description}
            </p>
            
            <div class="row align-items-end mt-auto">
            <div class="col d-flex justify-content-between align-items-end">
              <div class=" col d-inline-flex bd-highlight ">
                ${assignee}
              </div>
              <div class="d-inline-flex bd-highlight">
                ${dueDate}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>`;
  return html;
}
//Structure for class:
class TaskManager {
    constructor(currentId = 0)
    {
        // initialize an empty array called tasks
        this._tasks = [];
        //initialize a currentId set to currentId
        this._currentId = currentId;
    };
    //getter for book array
    get tasks() 
    {
        return this._tasks;
    };
    //setters for book array
     
        
    //function addTask
    addTask(taskName, status, assignee, dueDate, description = "") 
    {
      console.log("I m in add task!!!!!!!")
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

    render()
    {
      let taskHtmlListToDo = [];
      let taskHtmlListInProgress = [];
      let taskHtmlListReview = [];
      let taskHtmlListDone = [];
      for(let task of this._tasks)
      {
          let date = new Date(task.dueDate);
          console.log(date)
          console.log(task.dueDate)
          let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
          console.log("formatted date  " +formattedDate)
          //taskName, status, assignee, dueDate, description
          let taskHtml = createTaskHtml(task.taskName, task.status, task.assignee, formattedDate, task.description, task.id);
          console.log(taskHtml)
          console.log(task.status)
          console.log(typeof task.status)
          // if(task.status === 1)
          // {console.log(" its 1")}
          switch(task.status)
          {
           case "To Do":
             console.log("in to do")
                taskHtmlListToDo.push(taskHtml);
                break;
            case "In Progress":
              console.log("in progress")
                taskHtmlListInProgress.push(taskHtml);
                break;
            case "Review":
                taskHtmlListReview.push(taskHtml);
                break
            case "Done":
              console.log("in done")
                taskHtmlListDone.push(taskHtml);
                break;

          }
      }
      let todoColumn = document.querySelector("#doList");
      todoColumn.innerHTML = taskHtmlListToDo.join('');
      let inProgressColumn = document.querySelector("#inProgressList");
      inProgressColumn.innerHTML = taskHtmlListInProgress.join('');
      let reviewColumn = document.querySelector("#reviewList");
      reviewColumn.innerHTML = taskHtmlListReview.join('');
      let doneColumn = document.querySelector("#doneList");
      doneColumn.innerHTML = taskHtmlListDone.join('');
      
    };
    
    getTaskById(taskId){

      for(let task of this._tasks){
        if(task.id === taskId){
          console.log("get task by id::found task  name is " + task.taskName);
          return task;
        }

      }
      console.log("task not found");
      return null;
    }
    updateTask(id,taskName, status, assignee, dueDate, description = "") 
    {
      console.log("I m in update task class fn!!!!!!!")
      console.log("in class update task id" +id);
      let taskToBeUpdated = this.getTaskById(id);
      console.log("in class update task is" + taskToBeUpdated)
        
      taskToBeUpdated.id =  id;
      taskToBeUpdated.taskName= taskName;
      taskToBeUpdated.status= status;
      taskToBeUpdated.assignee= assignee;
      taskToBeUpdated.dueDate= dueDate;
      taskToBeUpdated.description= description;
      console.log(this._tasks);
        

        //return this._tasks.push(newTask);
    } ;

    //adding save to local storage method
  save(){
    let tasksJson = JSON.stringify(this._tasks);
    localStorage.setItem("myTasks", tasksJson);
    let currentId = String(this._currentId);
    localStorage.setItem("myCurrentId", currentId);
  }

     //adding the load from local storage method
     load(){
      if (localStorage.getItem("myTasks")){
        const tasksJson = localStorage.getItem("myTasks");
        this._tasks = JSON.parse(tasksJson);
      }
      if (localStorage.getItem("myCurrentId")){
        const currentId = localStorage.getItem("myCurrentId");
        this._currentId = Number(currentId);
      }
    }

    deleteTask(taskId){
      let newTasks = [];
      for(let task of this._tasks) {
        if (task.id !== taskId){
          console.log("in class delet task: task being retained with id:" + task.id);
          newTasks.push(task);
        }
       // this._tasks = newTasks;
      }
      this._tasks = newTasks;
      console.log("in class deleteTask f'n new array is :" + newTasks);
    }


}
export{TaskManager};