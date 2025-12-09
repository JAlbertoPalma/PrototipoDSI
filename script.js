let currentScreen = 'login'; // Pantalla inicial
const screens = ['login', 'registro', 'foro', 'zona_tranquila', 'directorio', 'perfil', 'perfil_psicologo'];

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
    if (['foro', 'zona_tranquila', 'directorio', 'perfil', 'perfil_psicologo'].includes(currentScreen)) {
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

// Mostramos las opciones de comboboxes
function mostrarOpciones() {
    const opcionesDiv = document.getElementById("opciones-ejercicios");
    const applyBtn = document.getElementById("btn-apply");

    // 1. Mostramos el div de opciones
    if (opcionesDiv) {
        opcionesDiv.style.display = 'block';
    }

    // 2. Mostramos el botón de Registrarse
    if (applyBtn) {
        applyBtn.style.display = 'block';
    }

    //Deshabilitamos el boton de vamos
    const vamosbtn = document.querySelector('.btn-primary[onclick="mostrarOpciones()"]');
    if(vamosbtn){
        vamosbtn.disabled =true;
        vamosbtn.textContent='Opciones Agregadas';
        vamosbtn.style.backgroundColor = '#52525b';
    }
}

// Mostrar u ocultar la caja de comentarios
function toggleComments(elementId) {
    const commentBox = document.getElementById(elementId);
    if (commentBox) {
        // Si está visible lo ocultamos, si no, lo mostramos
        if (commentBox.style.display === 'none') {
            commentBox.style.display = 'block';
            // Animación simple de entrada
            commentBox.style.opacity = '0';
            setTimeout(() => commentBox.style.opacity = '1', 10);
        } else {
            commentBox.style.display = 'none';
        }
    }
}

// Dar Like (Cambia color y suma 1)
function toggleLike(element) {
    const icon = element.querySelector('svg') || element.querySelector('i'); // Busca el icono
    const countSpan = element.querySelector('.like-count'); // Busca el número
    
    // Verificamos si ya tiene like (clase ficticia 'liked')
    if (element.classList.contains('liked')) {
        element.classList.remove('liked');
        element.style.color = ''; // Vuelve al color original
        countSpan.textContent = parseInt(countSpan.textContent) - 1; // Resta 1
    } else {
        element.classList.add('liked');
        element.style.color = '#3b82f6';
        countSpan.textContent = parseInt(countSpan.textContent) + 1; // Suma 1
        
        // Efecto visual pequeño
        icon.style.transform = 'scale(1.2)';
        setTimeout(() => icon.style.transform = 'scale(1)', 200);
    }
}