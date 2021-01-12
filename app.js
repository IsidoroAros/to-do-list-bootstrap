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

document.addEventListener('DOMContentLoaded', iniciarApp);
textArea.addEventListener('blur', validarCampos);
dateArea.addEventListener('blur', validarCampos);
resetBtn.addEventListener('click', resetearFormulario);
saveBtn.addEventListener('click', addTask);
clearAll.addEventListener('click', clearInjection);

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

function resetearFormulario() 
{
    form.reset(); //! Metodo que resetea un formulario si es que ya tenemos una referencia a él
    limpiarError();
}

function addTask()
{
    const taskInfo = {
        "task" : textArea.value,
        "date": dateArea.value
    }
    if(taskInfo.task !== '' && taskInfo.date !== '')
    {
        const task = document.createElement('div');
        task.classList.add('task-card', 'border', 'border-info', 'mt-4')
        task.setAttribute('data-order', totalTasks.length);
        task.innerHTML = `
        <p id="task-info">
        ${taskInfo.task}
        </p>
        <p id="task-date">
        ${taskInfo.date}
        </p>
        <button type="button" class="btn-close" aria-label="Close" onclick="deleteTask(event)""></button>
        `
        const injection = document.querySelector('.task-injection');
        injection.appendChild(task);
        totalTasks.push(task.children);
        // console.log(totalTasks)
        resetearFormulario();
    }else
    {
        mensajeError('There are empty fields remaining')
    }
}

function deleteTask(event)
{
    const position = event.target.parentNode.getAttribute('data-order');
    // alert(position)
    totalTasks.splice(position,1);
    redrawTasks(totalTasks);
}

function clearInjection()
{
    taskInjection.innerHTML = '';
}

function redrawTasks(arr)
{
    clearInjection();
    for(let i=0; i<arr.length; i++)
    {
        const taskInfo = 
            {
                "task" : arr[i].item(0).textContent,
                "date" : arr[i].item(1).textContent
            }
            const task = document.createElement('div');
            task.classList.add('task-card', 'border', 'border-info', 'mt-4')
            task.setAttribute('data-order', totalTasks.length);
            task.innerHTML = `
            <p id="task-info">
            ${taskInfo.task}
            </p>
            <p id="task-date">
            ${taskInfo.date}
            </p>
            <button type="button" class="btn-close" aria-label="Close" onclick="deleteTask(event)""></button>
            `
            const injection = document.querySelector('.task-injection');
            injection.appendChild(task);
        }
}
