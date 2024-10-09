const Horario = [];
let timeSlots = [];

// Jornada Horarios para Matutina y Vespertina
const jornadaHorarios = {
    Matutina: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
    Vespertina: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
};

// Obtener los datos de la facultad, jornada y nivel seleccionados
const facultad = localStorage.getItem("facultad");
const jornada = localStorage.getItem("jornada");
const nivel = localStorage.getItem("nivel");

// Mostrar la información en la página
document.getElementById("facultadSeleccionada").textContent = facultad;
document.getElementById("jornadaSeleccionada").textContent = jornada;
document.getElementById("nivelSeleccionado").textContent = nivel;

// Configuración inicial al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    timeSlots = jornadaHorarios[jornada];  
    const tbody = document.querySelector("#TablaHorarios tbody");

    timeSlots.forEach(timeSlot => {
        const row = tbody.insertRow();
        row.insertCell().textContent = timeSlot;
        
        for (let i = 0; i < 5; i++) {
            row.insertCell();
        }
    });

    llenarSelectHoras();
    llenarSelectMateriasYProfesores();
});

// Función para llenar el select de horas
function llenarSelectHoras() {
    const inicioClasSelect = document.getElementById("InicioClas");
    inicioClasSelect.innerHTML = "";

    timeSlots.forEach(hora => {
        const option = document.createElement("option");
        option.value = hora;
        option.textContent = hora;
        inicioClasSelect.appendChild(option);
    });
}

// Llenar el formulario de materias y profesores según el nivel y carrera
const materiasPorNivel = {
    'Ingeniería en Software': {
        1: ['Fundamentos de la ingeniería de software', 'Arquitectura del computador', 'Algoritmo y lógica de programación','Algebra lineal', 'Cátedra Alfaro' ],
        2: ['Ingeniera de requisitos', 'Sistemas operativos','Programación estructurada','Matemática discreta','Administración empresarial' ],
        3: ['Modelado orientado a objetos', 'Redes de computadoras','Programación orientado a objetos', 'Estructura de datos', 'Base de datos'],
        4: ['Perspectiva de la inteligencia artificial', 'Administración de servidores','Aplicación para el cliente web','Administración de base de datos distribuidas','Estadística para la ingeniería'],
        5: ['Arquitectura del software', 'Interfaz Humano - Computador','Aplicación para el servidor web','Minería de datos', 'Modelado ágil de software'],
        6: ['Usabilidad y accesibilidad', 'Ciclo de desarrollo de software seguro','Aplicación móviles nativas','Visualización de datos','Metodología de investigación'],
        7: ['Diseño centralizado en el usuario', 'Auditoria de software', 'Aplicaciones móviles hibridas','Análisis de negocios', 'Diseño de integración curricular'],
        8: ['Gestión de proyectos de software', 'Hacking Ético','Integración e implementación de software', 'Calidad de software', 'Desarrollo del trabajo de integración curricular']
    },
    'TI': {
        1: ['Tecnologías de la Información', 'Algoritmos y Programación', 'Matemáticas Discretas', 'Álgebra Lineal', 'Metodología de la Investigación'],
        2: ['Sistemas Operativos', 'Estructura de Datos', 'Estadística y Probabilidad', 'Aplicación de Sistemas Operativos', 'Análisis y Diseño de Sistemas de Bases de Datos'],
        3: ['Programación Orientada a Objetos', 'Bases de Datos', 'Sistemas Digitales', 'Interfaces Humano Computador', 'Ingeniería de Requisitos'],
        4: ['Gestión de Tecnologías de la Información', 'Ingeniería de Software I', 'Ingeniería de Software II', 'Tecnologías de Entorno de Enrutamiento', 'Aplicaciones Web I'],
        5: ['Inteligencia de Negocios', 'Aplicaciones Móviles', 'Desarrollo Web II', 'Aplicaciones Web II', 'Auditoría de Seguridad de la Información'],
        6: ['Redes de Computadoras', 'Seguridad de la Información', 'Integración de Plataformas', 'Informática Forense', 'Prácticas Laborales'],
        7: ['Trabajo de Titulación', 'Gestión de Proyectos de Tecnologías de la Información', 'Sistemas de Gestión'],
        8: ['Práctica Profesional', 'Trabajo de Titulación', 'Trabajo de Currículum de Diseño']
    }
};

const profesoresPorNivel = {
    'Ingeniería en Software': {
        1: ['Ing. Linus Torvalds', 'Ing. Ada Lovelace', 'Ing. Bjarne Stroustrup', 'Ing. James Gosling', 'Ing. Margaret Hamilton'],
        2: ['Ing. Tim Berners-Lee', 'Ing. Donald Knuth', 'Ing. Ken Thompson', 'Ing. Guido van Rossum', 'Ing. Grace Hopper'],
        3: ['Ing. Robert C. Martin', 'Ing. John McCarthy', 'Ing. Alan Turing', 'Ing. Richard Stallman', 'Ing. John von Neumann'],
        4: ['Ing. Brian Kernighan', 'Ing. Barbara Liskov', 'Ing. Mark Zuckerberg', 'Ing. Jeff Dean', 'Ing. Linus Pauling'],
        5: ['Ing. Peter Norvig', 'Ing. Charles Simonyi', 'Ing. Brendan Eich', 'Ing. Tim Sweeney', 'Ing. Vinton Cerf'],
        6: ['Ing. Mark Shuttleworth', 'Ing. Don Box', 'Ing. Bill Gates', 'Ing. Steve Wozniak', 'Ing. Elon Musk'],
        7: ['Ing. Sundar Pichai', 'Ing. Marissa Mayer', 'Ing. Sheryl Sandberg', 'Ing. Satya Nadella', 'Ing. Jeff Bezos'],
        8: ['Ing. Rachael Chong', 'Ing. Jane Margolis', 'Ing. Diane Greene', 'Ing. Susan Wojcicki', 'Ing. Janet Abbate'],
    },
    'TI': {
        1: ['Ing. Linus Torvalds', 'Ing. Ada Lovelace', 'Ing. Bjarne Stroustrup', 'Ing. James Gosling', 'Ing. Margaret Hamilton'],
        2: ['Ing. Tim Berners-Lee', 'Ing. Donald Knuth', 'Ing. Ken Thompson', 'Ing. Guido van Rossum', 'Ing. Grace Hopper'],
        3: ['Ing. Robert C. Martin', 'Ing. John McCarthy', 'Ing. Alan Turing', 'Ing. Richard Stallman', 'Ing. John von Neumann'],
        4: ['Ing. Brian Kernighan', 'Ing. Barbara Liskov', 'Ing. Mark Zuckerberg', 'Ing. Jeff Dean', 'Ing. Linus Pauling'],
        5: ['Ing. Peter Norvig', 'Ing. Charles Simonyi', 'Ing. Brendan Eich', 'Ing. Tim Sweeney', 'Ing. Vinton Cerf'],
        6: ['Ing. Mark Shuttleworth', 'Ing. Don Box', 'Ing. Bill Gates', 'Ing. Steve Wozniak', 'Ing. Elon Musk'],
        7: ['Ing. Sundar Pichai', 'Ing. Marissa Mayer', 'Ing. Sheryl Sandberg', 'Ing. Satya Nadella', 'Ing. Jeff Bezos'],
        8: ['Ing. Rachael Chong', 'Ing. Jane Margolis', 'Ing. Diane Greene', 'Ing. Susan Wojcicki', 'Ing. Janet Abbate'],
    }
};


function llenarSelectMateriasYProfesores() {
    const profesorSelect = document.getElementById("profesor");
    const materiaSelect = document.getElementById("Materia");

    // Limpiar los selectores
    profesorSelect.innerHTML = "";
    materiaSelect.innerHTML = "";

    const materias = materiasPorNivel[facultad][nivel];
    const profesores = profesoresPorNivel[facultad][nivel];

    materias.forEach(materia => {
        const option = document.createElement("option");
        option.value = materia;
        option.textContent = materia;
        materiaSelect.appendChild(option);
    });

    profesores.forEach(profesor => {
        const option = document.createElement("option");
        option.value = profesor;
        option.textContent = profesor;
        profesorSelect.appendChild(option);
    });
}


document.getElementById("AgregarHorario").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const profesor = document.getElementById("profesor").value;
    const aula = document.getElementById("Aula").value;
    const Materia = document.getElementById("Materia").value;
    const Dia = document.getElementById("Dia").value;
    const horaInicio = document.getElementById("InicioClas").value;
    const duracion = parseInt(document.getElementById("Duracion").value);

    console.log({ profesor, aula, Materia, Dia, horaInicio, duracion });  // Verificar los valores

    const startTimeIndex = timeSlots.indexOf(horaInicio);
    
    if (startTimeIndex === -1) {
        alert("¡Hora de inicio inválida!");
        return;
    }
    
    const endTimeIndex = startTimeIndex + duracion;

    if (!checkConflict(Dia, startTimeIndex, endTimeIndex, profesor, aula)) {
        addScheduleToTable(profesor, aula, Materia, Dia, startTimeIndex, endTimeIndex);
    } else {
        alert("¡Conflicto detectado! Este horario se superpone con otro.");
    }

    this.reset();
});


// Función para verificar conflictos de horarios
function checkConflict(Dia, startTimeIndex, endTimeIndex, profesor, aula) {
    return Horario.some(entry => 
        entry.Dia === Dia && 
        (entry.profesor === profesor || entry.aula === aula) &&
        (entry.startTimeIndex < endTimeIndex && entry.endTimeIndex > startTimeIndex)
    );
}

// Función para agregar el horario a la tabla
function addScheduleToTable(profesor, aula, Materia, Dia, startTimeIndex, endTimeIndex) {
    const tbody = document.querySelector("#TablaHorarios tbody");
    const DiaIndex = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"].indexOf(Dia) + 1;
    
    for (let i = startTimeIndex; i < endTimeIndex; i++) {
        const row = tbody.rows[i];
        const cell = row.cells[DiaIndex];

        if (cell.innerHTML !== "") {
            alert(`¡Conflicto detectado en el horario para ${Materia} durante la hora ${timeSlots[i]} en el día ${Dia}!`);
            return;
        }        

        cell.innerHTML = `
            <strong>${Materia}</strong><br>
            Prof: ${profesor}<br>
            Aula: ${aula}
        `;
    }

    Horario.push({ profesor, aula, Materia, Dia, startTimeIndex, endTimeIndex });
} 

document.getElementById("regresar").addEventListener("click", function() {
    window.location.href = "index.html"; // Cambia esto por el nombre de tu archivo de selección
});

document.getElementById("guardarHorario").addEventListener("click", function() {
    html2canvas(document.querySelector(".CuadrillaHorario")).then(canvas => {
        // Convertir la captura en una imagen y crear un enlace de descarga
        let link = document.createElement("a");
        link.download = 'horario.png';  // Nombre de la imagen descargada
        link.href = canvas.toDataURL();
        link.click();
    });
});
