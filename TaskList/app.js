//Define UI variables

const form = document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('#clear-task');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

// Load Event Listeners

loadEventListeners();

function loadEventListeners(){
//Add task event
form.addEventListener('submit',addTask);
//Remove Task 
taskList.addEventListener('click',removeTask);
//Clear Task Events
clearBtn.addEventListener('click',clearTasks);
//Filter Tasks 
filter.addEventListener('keyup',filterTasks);
//DOM Load event
document.addEventListener('DOMContentLoaded',getTasks);

}
//Event Handler
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    // create new link element

    const link = document.createElement('a');
    //Add class
    link.className='delete-item secondary-content';
    //Add icon HTML
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
   
    //Append li to ul

    taskList.appendChild(li);

    });
}
function addTask(e){
    if(taskInput.value === ''){
        alert("Add a Task");
    }


    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element

    const link = document.createElement('a');
    //Add class
    link.className='delete-item secondary-content';
    //Add icon HTML
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
   
    //Append li to ul

    taskList.appendChild(li);

    //store in LS

    storeTaskInLocalStorage(taskInput.value);

    //clear Input

    taskInput.value='';
    e.preventDefault();
}
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")){
        e.target.parentElement.parentElement.remove();
        }
        console.log(e.target);
    }
}

function clearTasks(){
    
    taskList.innerHTML='';
/* while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
} */
}

function filterTasks(e){
   const text =e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach
   (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1)
    {
        task.style.display='block';
    } else {
        task.style.display='none';
    }
   });
   

}