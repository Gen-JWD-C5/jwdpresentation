// This file deals with class definition for task planner
// create card body to push into html
function createTaskHtml(taskName, status, assignee, dueDate, description = ""){
    const html = `<li class="list-group-item">
    <div class="row mx-auto ">
      <div class="col d-flex justify-content-center">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="btn-group">
                  <div class="dropdown">
                    <button
                      class="btn btn-sm btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ${status}
                    </button>
                    <ul id="statusOption" class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">To Do</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#"
                          >In Progress</a
                        >
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Review</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Done</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col text-end">
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
//module.exports.TaskManager = TaskManager;
    //function deleteTask
    //blank function as of now 
const deleteTask = () => {

}

    //function updateStatus
    //blank function as of now
const updateStatus = () => {

}
export{TaskManager, createTaskHtml};