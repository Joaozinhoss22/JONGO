// Dados de eventos do calendário (mantidos)
const EVENTS = {
    '10-2025': { 19: 'Festa das Crianças (13h), Espetaculo Mamulengo das (14h as 15h, Oficina de Maracá das (15h as 16h)' },
    '11-2025': { 15: 'Festa da Consciência Negra 2025 (13h)' }
};

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let today = currentDate.getDate();

const calendarBody = document.getElementById('calendar-body');
const monthYearDisplay = document.getElementById('current-month-year');
const eventDetails = document.getElementById('event-details');

function renderCalendar(month, year) {
    calendarBody.innerHTML = '';
    monthYearDisplay.textContent = `${monthNames[month]} de ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    const eventKey = `${month + 1}-${year}`;
    const monthEvents = EVENTS[eventKey] || {};

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDayOfMonth) {
                cell.classList.add('dia-vazio');
                cell.innerHTML = '';
            } else if (date > daysInMonth) {
                cell.classList.add('dia-vazio');
                cell.innerHTML = '';
            } else {
                cell.textContent = date;

                if (date === today && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                    cell.classList.add('dia-atual');
                }

                if (monthEvents[date]) {
                    cell.classList.add('dia-evento');
                    cell.setAttribute('data-event', monthEvents[date]);
                }

                cell.addEventListener('click', function () {
                    document.querySelectorAll('.calendar-grid td').forEach(td => td.style.backgroundColor = '');

                    if (!this.classList.contains('dia-vazio')) {
                        this.style.backgroundColor = '#d3c69c';
                    }

                    const eventInfo = this.getAttribute('data-event');
                    if (eventInfo) {
                        eventDetails.innerHTML = `<strong>Dia ${this.textContent} - ${monthNames[month]}:</strong><br>${eventInfo}`;
                    } else if (!this.classList.contains('dia-vazio')) {
                        eventDetails.textContent = `Dia ${this.textContent}: Nenhum evento agendado.`;
                    }
                });

                date++;
            }
            row.appendChild(cell);
        }

        if (date > daysInMonth) {
            break;
        }

        calendarBody.appendChild(row);
    }
}

// Funções de Navegação do Calendário
document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

// Inicia o calendário
renderCalendar(currentMonth, currentYear);

// --- Lógica da Galeria de Fotos ---
const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
const currentGalleryImage = document.getElementById('currentGalleryImage');
const galleryModalLabel = document.getElementById('galleryModalLabel');
const imageCaption = document.getElementById('imageCaption');
const prevImageBtn = document.getElementById('prevImage');
const nextImageBtn = document.getElementById('nextImage');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentImageIndex = 0;
let imagesData = [];

// Coleta os dados das imagens da galeria
galleryItems.forEach((item, index) => {
    imagesData.push({
        src: item.getAttribute('data-img-src'),
        title: item.getAttribute('data-img-title')
    });

    item.addEventListener('click', () => {
        currentImageIndex = index;
        showImageInModal(currentImageIndex);
        galleryModal.show();
    });
});

function showImageInModal(index) {
    currentGalleryImage.src = imagesData[index].src;
    galleryModalLabel.textContent = imagesData[index].title;
    imageCaption.textContent = imagesData[index].title;
}

prevImageBtn.addEventListener('click', () => {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = imagesData.length - 1;
    }
    showImageInModal(currentImageIndex);
});

nextImageBtn.addEventListener('click', () => {
    currentImageIndex++;
    if (currentImageIndex >= imagesData.length) {
        currentImageIndex = 0;
    }
    showImageInModal(currentImageIndex);
});


// Função JS para rolagem suave (mantida)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Função para o botão "Voltar ao Topo"
    // Seleciona o botão
    const btnTop = document.getElementById('btn-top');

    // Mostra ou esconde o botão dependendo da posição de rolagem
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            btnTop.style.display = "block";
        } else {
            btnTop.style.display = "none";
        }
    };

    // Adiciona a funcionalidade de clique para rolar para o topo
    btnTop.addEventListener('click', function(e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Animação de rolagem suave
        });
    });
