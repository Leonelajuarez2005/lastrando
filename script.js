//Menú Hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
//Cotización del dólar y reservas
document.addEventListener('DOMContentLoaded', () => {
    const packageSelect = document.getElementById('package-select');
    const peopleQty = document.getElementById('people-qty');
    const unitUsdEl = document.getElementById('unit-usd');
    const totalUsdEl = document.getElementById('total-usd');
    const totalArsEl = document.getElementById('total-ars');
    const rateEl = document.getElementById('exchange-rate');
    const form = document.getElementById('experience-form');
    const confirmation = document.getElementById('booking-confirmation');

    // Cotización por si falla la API
    let usdRate = 1450;

    //tipo de cambio del dólar 
    async function fetchExchangeRate() {
        try {
            const response = await fetch('https://dolarapi.com/v1/dolares/oficial');
            if (response.ok) {
                const data = await response.json();
                usdRate = data.venta;
                if (rateEl) {
                    rateEl.textContent = `$${usdRate.toFixed(2)} ARS (Fuente: DolarApi Oficial)`;
                }
            } else {
                throw new Error('No se pudo conectar a la API de divisas.');
            }
        } catch (error) {
            console.warn('Usando cotización de reserva por error en API:', error);
            if (rateEl) {
                rateEl.textContent = `$${usdRate.toFixed(2)} ARS (Cotización oficial de referencia)`;
            }
        }
        calculateTotal();
    }

    // USD a ARS
    function calculateTotal() {
        if (!packageSelect || !peopleQty) return;

        const unitPrice = parseFloat(packageSelect.value) || 0;
        const qty = parseInt(peopleQty.value) || 1;
        const totalUSD = unitPrice * qty;
        const totalARS = totalUSD * usdRate;

        if (unitUsdEl) {
            unitUsdEl.textContent = `$${unitPrice.toFixed(2)} USD`;
        }
        if (totalUsdEl) {
            totalUsdEl.textContent = `$${totalUSD.toFixed(2)} USD`;
        }
        if (totalArsEl) {
            totalArsEl.textContent = `$${totalARS.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }

    if (packageSelect && peopleQty) {
        packageSelect.addEventListener('change', calculateTotal);
        peopleQty.addEventListener('input', calculateTotal);
        fetchExchangeRate();
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedOption = packageSelect.options[packageSelect.selectedIndex].getAttribute('data-name') || packageSelect.options[packageSelect.selectedIndex].text;
            
            if (confirmation) {
                confirmation.innerHTML = `<strong>¡Reserva Confirmada (Simulación)!</strong><br>Has seleccionado: <em>${selectedOption}</em> para <strong>${peopleQty.value} persona(s)</strong>.<br>Importe a abonar en el establecimiento: <strong>${totalArsEl ? totalArsEl.textContent : '$0.00'} ARS</strong> (${totalUsdEl ? totalUsdEl.textContent : '$0.00 USD'}).`;
                confirmation.classList.remove('hidden');
            }
        });
    }
});
//Validación de formularios 
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
//Bot de consultas
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