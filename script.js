document.addEventListener('DOMContentLoaded', () => {
    // Control del Menú Lateral Desplegable
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const menuLinks = document.querySelectorAll('.side-menu a');

    function toggleMenu() {
        sideMenu.classList.toggle('open');
        overlay.classList.toggle('active');
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuClose.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideMenu.classList.remove('open');
            overlay.classList.remove('active');
        });
    });

    // Filtros Dinámicos de la Carta y Buscador
    const filterChips = document.querySelectorAll('.filter-chips .chip');
    const foodCards = document.querySelectorAll('.cards-container .food-card');
    const searchInput = document.getElementById('food-search');

    function filterMenu() {
        const activeChip = document.querySelector('.filter-chips .chip.active');
        const filterValue = activeChip ? activeChip.getAttribute('data-filter') : 'all';
        const searchText = searchInput.value.toLowerCase().trim();

        foodCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const name = card.getAttribute('data-name');
            
            const matchesCategory = (filterValue === 'all' || category === filterValue);
            const matchesSearch = name.includes(searchText);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            filterMenu();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', filterMenu);
    }
});

// Sistema de Favoritos Interactivo
let favoriteCount = 0;
function toggleFavorite(button, dishName) {
    const icon = button.querySelector('i');
    button.classList.toggle('active');
    
    if (button.classList.contains('active')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        favoriteCount++;
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        favoriteCount = Math.max(0, favoriteCount - 1);
    }
    
    document.getElementById('cart-counter').textContent = favoriteCount;
}

// Funciones del Modal Interactivo
const modal = document.getElementById('food-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');

function openModal(title, price, desc, imgUrl) {
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalDesc.textContent = desc;
    modalImg.src = imgUrl;
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});