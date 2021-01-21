//* Variables

const form = document.querySelector('.task-creator-form');
const textArea = document.querySelector('.text-area');
const dateArea = document.querySelector('.date');
const saveBtn = document.querySelector('.btn-success');
const resetBtn = document.querySelector('.btn-danger')
const taskInjection = document.querySelector('.task-injection');
const clearAll = document.querySelector('#clear-all');
const errorMessage = document.createElement('p');
let totalTasks = [];

//* Event listeners

textArea.addEventListener('blur', validarCampos);
dateArea.addEventListener('blur', validarCampos);
resetBtn.addEventListener('click', resetearFormulario);
saveBtn.addEventListener('click', addTask);
clearAll.addEventListener('click', resetear);
document.addEventListener('DOMContentLoaded', ()=> {
    iniciarApp();
    totalTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    crearHTML();
})

//* Funciones

function iniciarApp()
{
    saveBtn.classList.add('disabled');
}

function mensajeError(mensaje)
{
    errorMessage.textContent = mensaje;
    errorMessage.classList.add('border', 'border-danger');
    errorMessage.style.padding = '10px';
    errorMessage.style.color = 'red';
    errorMessage.style.textAlign = 'center';
    form.insertBefore(errorMessage, textArea);
    setTimeout(limpiarError, 5000);
}

function limpiarError() 
{
    errorMessage.remove();
}

function validarCampos(e) 
{
    if(e.target.type === 'textarea') //* Validar el texto
    {
        if(textArea.value !== '')
        {
            textArea.classList.remove('border', 'border-danger');
            textArea.classList.add('border', 'border-success');
            textArea.setAttribute('data-success', 'true');
        }else
        {
            textArea.classList.add('border', 'border-danger');
            mensajeError('Empty task field');
            return;
        }
    }else{ //* Validar la fecha
        if(dateArea.value !== '')
        {
            dateArea.classList.remove('border', 'border-danger');
            dateArea.classList.add('border', 'border-success');
            dateArea.setAttribute('data-success', 'true');
        }else
        {
            dateArea.classList.add('border', 'border-danger');
            mensajeError('Non valid date');
            return;
        }
    }
    if(dateArea.hasAttribute('data-success') && textArea.hasAttribute('data-success'))
    {
        saveBtn.classList.remove('disabled');
    }
}

function sincronizarStorage()
{
    localStorage.setItem('tasks', JSON.stringify(totalTasks))
}


function resetearFormulario() 
{
    form.reset(); //! Metodo que resetea un formulario si es que ya tenemos una referencia a él
    limpiarError();
}

function addTask()
{
    const taskElement = {
        task: textArea.value,
        date: dateArea.value,
        id: Date.now()
    }

    if(taskElement.task !== '' && taskElement.date !== '')
    {
        const task = document.createElement('div');
        task.classList.add('task-card', 'border', 'border-info', 'mt-4')
        task.innerHTML = `
        <p id="task-info">
        ${taskElement.task}
        </p>
        <p id="task-date">
        ${taskElement.date}
        </p>
        <button type="button" class="btn-close" aria-label="Close" onclick="deleteTask(${taskElement.id})""></button>
        `
        taskInjection.appendChild(task);
        totalTasks = [...totalTasks, taskElement];
        resetearFormulario();
        sincronizarStorage();
    }else
    {
        mensajeError('There are empty fields remaining');
    }
}


// Crea el HTML inicial con lo que hay en el local storage
function crearHTML()
{
    limpiarHTML();

    totalTasks.forEach(taskElement => {
        const task = document.createElement('div');
        task.classList.add('task-card', 'border', 'border-info', 'mt-4')
        task.innerHTML = `
        <p id="task-info">
        ${taskElement.task}
        </p>
        <p id="task-date">
        ${taskElement.date}
        </p>
        <button type="button" class="btn-close" aria-label="Close" onclick="deleteTask(${taskElement.id})""></button>
        `
        taskInjection.appendChild(task);
    })
    sincronizarStorage();
}

function limpiarHTML()
{
    while(taskInjection.firstChild)
    {
        taskInjection.removeChild(taskInjection.firstChild)
    }
}

function resetear()
{
    limpiarHTML();
    localStorage.removeItem('tasks');
}

function deleteTask(id)
{
    console.log(`recibe el siguiente id: ${id}`)
    totalTasks = totalTasks.filter( task => task.id !== id);
    crearHTML();
}
