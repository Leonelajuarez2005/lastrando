// Menú Hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Gestión de reserva de recorridos completos
document.addEventListener('DOMContentLoaded', () => {
    const circuitSelect = document.getElementById('circuit-select');
    const circuitInfoBox = document.getElementById('circuit-info-box');
    const bookingForm = document.getElementById('table-booking-form');
    const bookingConfirmation = document.getElementById('booking-confirmation');

    // Listado con una sola ubicación representativa por local
    const circuitDetails = {
        fastfood: {
            title: "🍔 Recorrido Fast Food & Hamburgueserías de Autor",
            places: [
                "<strong>Félix Burgers:</strong> Av. Francisco Beiró 4473, Devoto (CABA)",
                "<strong>Big Pons:</strong> Unicenter Shopping, Martínez (GBA Norte)",
                "<strong>Kiddo:</strong> Honduras 5265, Palermo (CABA)",
                "<strong>Frank's Grill:</strong> Av. del Libertador 13837, Martínez (GBA Norte)"
            ]
        },
        meriendas: {
            title: "☕ Recorrido Cafeterías & Meriendas de Especialidad",
            places: [
                "<strong>La Panera Rosa:</strong> Av. Coronel Díaz 2401, Recoleta (CABA)",
                "<strong>Ayulem:</strong> La Pampa 2300, Belgrano (CABA)"
            ]
        },
        parrillas: {
            title: "🥩 Recorrido Parrillas & Bodegones Tradicionales",
            places: [
                "<strong>Bodegón de All Boys:</strong> Mercedes 1951, Floresta (CABA)",
                "<strong>El Ferroviario:</strong> Reservistas Argentinos 219, Liniers (CABA)"
            ]
        },
        bares: {
            title: "🍸 Recorrido Bares, Coctelería & Night",
            places: [
                "<strong>Invernadero:</strong> Av. del Libertador 1609, Recoleta (CABA)",
                "<strong>Misión Bar:</strong> Plaza Serrano, Palermo (CABA)"
            ]
        },
        internacional: {
            title: "🍣 Recorrido Comida Internacional & Sabores del Mundo",
            places: [
                "<strong>Fabric Sushi:</strong> Av. Pedro Goyena 100, Caballito (CABA)",
                "<strong>Kansas Grill:</strong> Av. del Libertador 105, San Isidro (GBA Norte)"
            ]
        }
    };

    function updateCircuitInfo() {
        if (!circuitSelect || !circuitInfoBox) return;

        const selectedKey = circuitSelect.value;
        const details = circuitDetails[selectedKey];

        if (details) {
            let listHTML = details.places.map(place => `<li>• ${place}</li>`).join('');
            circuitInfoBox.innerHTML = `
                <p class="font-bold text-carbon text-sm">${details.title}</p>
                <p class="text-gray-600 font-medium">Este recorrido incluye la visita guiada y mesa reservada en las siguientes paradas:</p>
                <ul class="space-y-1 text-gray-700 mt-1">${listHTML}</ul>
            `;
        }
    }

    if (circuitSelect) {
        circuitSelect.addEventListener('change', updateCircuitInfo);
        updateCircuitInfo(); // Carga la información inicial al abrir la página
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('booking-name').value.trim();
            const email = document.getElementById('booking-email').value.trim(); // Captura el email
            const circuitText = circuitSelect.options[circuitSelect.selectedIndex].text;
            const shift = document.getElementById('shift-select').value;
            const qty = document.getElementById('people-qty').value;

            if (bookingConfirmation) {
                bookingConfirmation.innerHTML = `
                    <strong>¡Recorrido Reservado con Éxito!</strong><br>
                    Gracias <em>${name}</em>. Te enviamos la confirmación a <strong>${email}</strong>.<br>
                    Recorrido: <strong>${circuitText}</strong> | Comensales: <strong>${qty} persona(s)</strong> | Turno: <strong>${shift}</strong>.
                `;
                bookingConfirmation.classList.remove('hidden');
                bookingForm.reset();
                updateCircuitInfo();
            }
        });
    }
});

// Validación de formularios de contacto
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form') || document.getElementById('formContacto');
    if (!contactForm) return;

    const nameInput = document.getElementById('contact-name') || document.getElementById('nombreContacto');
    const emailInput = document.getElementById('contact-email') || document.getElementById('emailContacto');
    const messageInput = document.getElementById('contact-message') || document.getElementById('mensaje');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const contactAlert = document.getElementById('contact-alert') || document.getElementById('mensajeContacto');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validar Nombre
        if (nameInput && nameInput.value.trim() === '') {
            if (nameError) nameError.classList.remove('hidden');
            isValid = false;
        } else if (nameError) {
            nameError.classList.add('hidden');
        }

        // Validar E-mail
        if (emailInput && !validateEmail(emailInput.value.trim())) {
            if (emailError) emailError.classList.remove('hidden');
            isValid = false;
        } else if (emailError) {
            emailError.classList.add('hidden');
        }

        // Validar Mensaje
        if (messageInput && messageInput.value.trim() === '') {
            if (messageError) messageError.classList.remove('hidden');
            isValid = false;
        } else if (messageError) {
            messageError.classList.add('hidden');
        }

        if (isValid && contactAlert) {
            const nombre = nameInput ? nameInput.value.trim() : 'Usuario';
            contactAlert.innerHTML = `<strong>¡Mensaje enviado con éxito!</strong><br>Gracias <em>${nombre}</em>, nos pondremos en contacto a la brevedad.`;
            contactAlert.classList.remove('hidden');
            contactForm.reset();
        }
    });
});

// Asistente Virtual / Bot de consultas
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatWindow = document.getElementById('chat-window');

    if (!chatInput || !chatSend || !chatWindow) return;

    // Base de conocimiento con palabras clave y respuestas asociadas
    const faqDatabase = [
        { 
            keywords: ['horario', 'hora', 'abren', 'abierto', 'cierran'], 
            response: 'Los horarios varían según la experiencia: las cafeterías abren de 08:30 a 20:00 hs, mientras que hamburgueserías y parrillas atienden de 12:00 a 16:00 y de 19:00 a 00:00 hs.' 
        },
        { 
            keywords: ['reserva', 'reservar', 'turno', 'lugar', 'costo', 'precio'], 
            response: 'Podés calcular el costo exacto y realizar la simulación de reserva desde nuestro menú en la sección "Reservar".' 
        },
        { 
            keywords: ['pago', 'tarjeta', 'efectivo', 'mercadopago', 'cuotas'], 
            response: 'La mayoría de los locales adheridos aceptan efectivo, tarjetas de débito/crédito y billeteras digitales (Mercado Pago).' 
        },
        { 
            keywords: ['vegano', 'vegetariano', 'tacc', 'celiaco', 'sin tacc', 'gluten'], 
            response: 'Todos nuestros circuitos cuentan con locales que incluyen opciones vegetarianas y alternativas adaptadas. Te sugerimos consultar la carta específica de cada lugar antes de tu visita.' 
        },
        { 
            keywords: ['ubicacion', 'donde', 'dirección', 'mapa', 'llegar'], 
            response: 'En nuestra página principal (Inicio) podés consultar el mapa interactivo general con todos los puntos gastronómicos marcados.' 
        }
    ];

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        if (sender === 'user') {
            msgDiv.className = 'bg-nude text-carbon p-2 rounded max-w-xs ml-auto text-right border border-topo font-medium';
        } else {
            msgDiv.className = 'bg-white text-carbon p-2 rounded max-w-xs border border-topo';
        }
        msgDiv.textContent = text;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function processQuestion() {
        const query = chatInput.value.trim().toLowerCase();
        if (query === '') return;

        appendMessage('user', chatInput.value);
        chatInput.value = '';

        let foundResponse = 'Lo siento, no entendí tu pregunta. Probá consultando por horarios, reservas, medios de pago, ubicación o menú vegetarianos/sin TACC.';

        for (const item of faqDatabase) {
            if (item.keywords.some(kw => query.includes(kw))) {
                foundResponse = item.response;
                break;
            }
        }

        setTimeout(() => {
            appendMessage('bot', foundResponse);
        }, 400);
    }

    chatSend.addEventListener('click', processQuestion);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processQuestion();
    });
});