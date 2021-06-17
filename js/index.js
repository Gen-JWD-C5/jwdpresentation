// This file deals with class definition for task planner
// create card body to push into html
function createTaskHtml(taskName, status, assignee, dueDate, description, taskId)
{
  const html = `<li class="list-group-item">
    <div class="row mx-auto">
      <div class="col d-flex justify-content-center">
        <div id="${taskId}" class="card card-style rounded-0">
          <div class="card-body">
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
              <a href="" >
                <svg
                  id = "deleteBtn"
                  xmlns="http://www.w3.org/2000/svg "
                  width="16 "
                  height="16 "
                  fill="currentColor "
                  class="bi bi-trash btn btn-outline-secondary"
                  viewBox="0 0 16 16 "
                >
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z "
                  />
                  <path
                    fill-rule="evenodd "
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1
                          1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z "
                  />
                </svg>
                </a>
                </button>
              </div>
            </div>

            <h5 class="card-title mt-2">${taskName}</h5>
            <p class="card-text">
              ${description}
            </p>
            <div class="d-flex justify-content-between">
              <div class="d-inline-flex p-2 bd-highlight">
                ${assignee}
              </div>
              <div class="d-inline-flex p-2 bd-highlight">
                ${dueDate}
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
      todoColumn.innerHTML = taskHtmlListToDo.join();
      let inProgressColumn = document.querySelector("#inProgressList");
      inProgressColumn.innerHTML = taskHtmlListInProgress.join();
      let reviewColumn = document.querySelector("#reviewList");
      reviewColumn.innerHTML = taskHtmlListReview.join();
      let doneColumn = document.querySelector("#doneList");
      doneColumn.innerHTML = taskHtmlListDone.join();
      
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

}
export{TaskManager};