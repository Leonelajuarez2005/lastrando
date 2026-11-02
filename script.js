// Gestión de reserva de recorridos completos y turnos dinámicos
document.addEventListener('DOMContentLoaded', () => {
    const circuitSelect = document.getElementById('circuit-select');
    const circuitInfoBox = document.getElementById('circuit-info-box');
    const shiftSelect = document.getElementById('shift-select');
    const bookingForm = document.getElementById('table-booking-form');
    const bookingConfirmation = document.getElementById('booking-confirmation');

  const circuitDetails = {
        fastfood: {
            title: "Recorrido Fast Food & Hamburgueserías de Autor",
            places: [
                "<strong>Félix Burgers:</strong> Av. Francisco Beiró 4473, Devoto (CABA)",
                "<strong>Big Pons:</strong> Unicenter Shopping, Martínez (GBA Norte)",
                "<strong>Kiddo:</strong> Honduras 5265, Palermo (CABA)",
                "<strong>Frank's Grill:</strong> Av. del Libertador 13837, Martínez (GBA Norte)"
            ]
        },
        meriendas: {
            title: "Recorrido Cafeterías & Meriendas de Especialidad",
            places: [
                "<strong>La Panera Rosa:</strong> Av. Coronel Díaz 2401, Recoleta (CABA)",
                "<strong>Ayulem:</strong> La Pampa 2300, Belgrano (CABA)"
            ]
        },
        parrillas: {
            title: "Recorrido Parrillas & Bodegones Tradicionales",
            places: [
                "<strong>Bodegón de All Boys:</strong> Mercedes 1951, Floresta (CABA)",
                "<strong>El Ferroviario:</strong> Reservistas Argentinos 219, Liniers (CABA)"
            ]
        },
        bares: {
            title: "Recorrido Bares, Coctelería & Night",
            places: [
                "<strong>Invernadero:</strong> Av. del Libertador 1609, Recoleta (CABA)",
                "<strong>Misión Bar:</strong> Plaza Serrano, Palermo (CABA)"
            ]
        },
        internacional: {
            title: "Recorrido Comida Internacional & Sabores del Mundo",
            places: [
                "<strong>Fabric Sushi:</strong> Av. Pedro Goyena 100, Caballito (CABA)",
                "<strong>Kansas Grill:</strong> Av. del Libertador 105, San Isidro (GBA Norte)"
            ]
        }
    };

    function updateCircuitData() {
        if (!circuitSelect) return;

        const selectedKey = circuitSelect.value;
        const details = circuitDetails[selectedKey];

        // 1. Actualiza el cuadro informativo de los locales
        if (details && circuitInfoBox) {
            let listHTML = details.places.map(place => `<li>• ${place}</li>`).join('');
            circuitInfoBox.innerHTML = `
                <p class="font-bold text-carbon text-sm">${details.title}</p>
                <p class="text-gray-600 font-medium">Este recorrido incluye la visita guiada y mesa reservada en las siguientes paradas:</p>
                <ul class="space-y-1 text-gray-700 mt-1">${listHTML}</ul>
            `;
        }

        // 2. Actualiza los turnos disponibles según el recorrido
        if (shiftSelect) {
            shiftSelect.innerHTML = ''; // Limpia opciones anteriores

            if (selectedKey === 'meriendas') {
                // Opciones específicas para Meriendas
                const option1 = document.createElement('option');
                option1.value = "Tarde (15:30 a 17:00 hs)";
                option1.textContent = "Tarde (15:30 a 17:00 hs)";

                const option2 = document.createElement('option');
                option2.value = "Tarde (17:00 a 19:30 hs)";
                option2.textContent = "Tarde (17:00 a 19:30 hs)";

                shiftSelect.appendChild(option1);
                shiftSelect.appendChild(option2);
            } else {
                // Opciones estándar para el resto de los recorridos
                const option1 = document.createElement('option');
                option1.value = "Mediodía (12:30 a 15:30 hs)";
                option1.textContent = "Mediodía (12:30 a 15:30 hs)";

                const option2 = document.createElement('option');
                option2.value = "Noche (20:00 a 23:30 hs)";
                option2.textContent = "Noche (20:00 a 23:30 hs)";

                shiftSelect.appendChild(option1);
                shiftSelect.appendChild(option2);
            }
        }
    }

    if (circuitSelect) {
        circuitSelect.addEventListener('change', updateCircuitData);
        updateCircuitData(); // Inicializa al cargar la página
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('booking-name').value.trim();
            const email = document.getElementById('booking-email').value.trim();
            const circuitText = circuitSelect.options[circuitSelect.selectedIndex].text;
            const shift = shiftSelect.value;
            const qty = document.getElementById('people-qty').value;

            if (bookingConfirmation) {
                bookingConfirmation.innerHTML = `
                    <strong>¡Recorrido Reservado con Éxito!</strong><br>
                    Gracias <em>${name}</em>. Te enviamos la confirmación a <strong>${email}</strong>.<br>
                    Recorrido: <strong>${circuitText}</strong> | Comensales: <strong>${qty} persona(s)</strong> | Turno: <strong>${shift}</strong>.
                `;
                bookingConfirmation.classList.remove('hidden');
                bookingForm.reset();
                updateCircuitData();
            }
        });
    }
});