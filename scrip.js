// Esperamos a que la página cargue totalmente
document.addEventListener('DOMContentLoaded', () => {
    cargarDatosFestival();
});

function cargarDatosFestival() {
    // Usamos fetch para obtener el archivo XML
    fetch('festival.xml')
        .then(response => response.text()) // Convertimos la respuesta a texto
        .then(data => {
            // Parseamos el texto a un documento XML real
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            
            // Seleccionamos el contenedor de nuestra página
            const contenedor = document.getElementById('contenedor-ajax');
            contenedor.innerHTML = ''; // Limpiamos el mensaje de "cargando"

            // Extraemos los eventos/actividades del XML
            const eventos = xml.getElementsByTagName('evento');

            // Recorremos cada evento y creamos su HTML
            Array.from(eventos).forEach(evento => {
                const hora = evento.getElementsByTagName('hora')[0].textContent;
                const artista = evento.getElementsByTagName('artista')[0].textContent;
                const escenario = evento.getAttribute('escenario');

                // Creamos la estructura con el estilo que ya tenemos en CSS
                const div = document.createElement('div');
                div.className = 'agenda-row';
                div.innerHTML = `
                    <span class="agenda-time">${hora}</span>
                    <span class="agenda-title">${artista}</span>
                    <span class="agenda-loc">${escenario}</span>
                `;
                contenedor.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error al cargar el XML:', error);
            document.getElementById('contenedor-ajax').innerHTML = '<p>Error al cargar los datos.</p>';
        });
}