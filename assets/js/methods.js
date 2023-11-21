var taskCount = 0;
//const TASKLIST = [];
//const IDLIST = [];
let COMPLETELIST = [];

function addTask(event) {
    //Evita que el formulario se envíe y recarge la página
    event.preventDefault();

    // Obtener el valor del elemento <input> con el id "taskInput"
    var taskInput = document.getElementById("taskInput").value;

    // Verificar que taskInput no se encuentre vacío

    if(taskInput) {
        //Incrementar número de tareas
        taskCount++;

        COMPLETELIST.push({id: taskCount, description: taskInput, completed:false});

        //Buscar id taskTable
        var taskTable = document.getElementById("taskTable");

        //Crea una fila y la adhiere al final de la tabla
        //var row = taskTable.tBodies[0].insertRow(-1);
        // Crear dos nuevas celdas y las agrega a la fila

        var row = taskTable.tBodies[0].insertRow(-1);
        //row.id = 'task-' + taskCount; // Asignar un ID único a la fila
        row.id = 'task-' + taskCount;

        //console.log(row.id);

        var idCell = row.insertCell(0);
        var taskCell = row.insertCell(1);
        var completeCell = row.insertCell(2);

        //Asigna el número de tareas a la primera celda
        idCell.textContent = taskCount;
        //Asigna la tarea del elemento <input>
        taskCell.textContent = taskInput.toLowerCase();

        /*Asigna la condición de la tarea
        completeCell.textContent = false;*/

        // Create a checkbox and append it to the third cell
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = false; // Unchecked by default
        // Use an IIFE (Immediately Invoked Function Expression) to create a closure
        /*checkbox.onchange = (function(taskIndex) {
            return function() {
                console.log(taskIndex);
                COMPLETELIST[taskIndex].completed = checkbox.checked;
            };
        })(taskCount - 1); // Pass the current index (taskCount - 1) to the IIFE
        completeCell.appendChild(checkbox);*/

        checkbox.dataset.taskId = taskCount; // Asignar ID de tarea al checkbox
        checkbox.onchange = checkboxChanged;
        completeCell.appendChild(checkbox);

       //Limpiar la barra <input>
       document.getElementById("taskInput").value = '';

       idCell.setAttribute('align', 'center');
       taskCell.setAttribute('align', 'center');
       completeCell.setAttribute('align', 'center');

       updateTaskCount();
       updateDoneTaskCount();

       //console.log(COMPLETELIST);
    };
}

function checkboxChanged() {
    var taskId = this.dataset.taskId;
    var task = COMPLETELIST.find(t => t.id == taskId);
    if (task) {
        task.completed = this.checked;
    }
}

function addCompleteTask() {
    var completeTable = document.getElementById("DoneTable");

    // Filtrar tareas completadas y actualizar COMPLETELIST
    var tasksToKeep = [];
    COMPLETELIST.forEach(task => {
        if (task.completed) {
            // Agregar a DoneTable
            var row_complete = completeTable.tBodies[0].insertRow(-1);
            var idCompleteCell = row_complete.insertCell(0);
            var taskCompleteCell = row_complete.insertCell(1);

            idCompleteCell.textContent = task.id;
            taskCompleteCell.textContent = task.description;

            idCompleteCell.setAttribute('align', 'center');
            taskCompleteCell.setAttribute('align', 'center');

            removeTaskFromTable(task.id);
        } else {
            tasksToKeep.push(task);
        }
    });

    //console.log(tasksToKeep)

    COMPLETELIST = tasksToKeep;
    updateTaskCount();
    updateDoneTaskCount(); // Actualizar el contador de tareas completadas

}

function removeTaskFromTable(taskId) {
    var taskTable = document.getElementById("taskTable");
    var tbody = taskTable.tBodies[0];
    var rows = tbody.rows;

    for (let i = 0; i < rows.length; i++) {
        var checkbox = rows[i].querySelector("input[type='checkbox']");
        if (checkbox && checkbox.dataset.taskId == taskId) {
            tbody.deleteRow(i);
            break;
        }
    }
}

function updateTaskCount() {
    const totalTaskElement = document.getElementById("totalTask");
    totalTaskElement.innerHTML = `Total: ${COMPLETELIST.length}`;
}

function updateDoneTaskCount() {
    const doneTable = document.getElementById("DoneTable").tBodies[0];
    const taskDoneElement = document.getElementById("TaskDone");
    const numberOfDoneTasks = doneTable.rows.length;
    taskDoneElement.innerHTML = `Complete: ${numberOfDoneTasks}`;
}