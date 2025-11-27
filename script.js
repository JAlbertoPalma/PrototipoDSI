let currentScreen = 'login'; // Pantalla inicial
const screens = ['login', 'registro1', 'registro2', 'foro', 'zona_tranquila', 'directorio'];

// Función mejorada para cargar contenido de archivos HTML
async function loadScreenContent(screenId) {
    const screenElement = document.getElementById(screenId);
    if (screenElement && !screenElement.hasAttribute('data-loaded')) {
        const url = screenElement.getAttribute('data-url');
        if (url) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const html = await response.text();
                    screenElement.innerHTML = html;
                    screenElement.setAttribute('data-loaded', 'true');
                    
                    // Re-inicializa los íconos de Lucide después de cargar el nuevo contenido
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                } else {
                    console.error(`Error al cargar el contenido de ${screenId}: ${response.statusText}`);
                }
            } catch (error) {
                console.error(`Fallo en la petición para cargar ${screenId}:`, error);
            }
        }
    }
}


function showScreen(screenId) {
    // Carga el contenido antes de mostrar
    loadScreenContent(screenId).then(() => {
        // Oculta todas las pantallas
        screens.forEach(id => {
            const screenElement = document.getElementById(id);
            if (screenElement) {
                screenElement.style.display = 'none';
            }
        });

        // Muestra la pantalla solicitada
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.style.display = 'block';
            currentScreen = screenId;
        }

        // Actualiza el menú de navegación y lo muestra/oculta
        updateNavMenu(screenId);
        toggleNavMenu();
    });
}

function updateNavMenu(screenId) {
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(button => {
        button.classList.remove('nav-button-active');
        if (button.getAttribute('data-screen') === screenId) {
            button.classList.add('nav-button-active');
        }
    });
}

function toggleNavMenu() {
    const menu = document.getElementById('nav-menu');
    // Muestra el menú solo en las pantallas principales
    if (['foro', 'zona_tranquila', 'directorio'].includes(currentScreen)) {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
}

// Función de alerta personalizada (para evitar el uso de alert())
function customAlert(message) {
    console.warn("ALERTA (UI no implementada): " + message);
    // Aquí se usaría una modal personalizada para el usuario
}

// Inicialización al cargar la página
window.onload = function() {
    // Mostrar la primera pantalla y controlar el menú
    showScreen(currentScreen);
};