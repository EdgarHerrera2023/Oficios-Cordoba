document.addEventListener('DOMContentLoaded', () => {
    let allWorkers = [...workers]; // Use a mutable copy of workers
    const workersGrid = document.getElementById('workers-grid');
    const locationFilter = document.getElementById('location-filter');
    const categoryFilter = document.getElementById('category-filter');
    const locationTabs = document.querySelector('.location-tabs');
    const workerCardTemplate = document.getElementById('worker-card-template');
    
    const workerModal = document.getElementById('worker-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalButton = workerModal.querySelector('.close-button');

    const registerBtn = document.getElementById('register-btn');
    const registerModal = document.getElementById('register-modal');
    const closeRegisterModalBtn = registerModal.querySelector('.register-close');
    const mercadoPagoBtn = document.getElementById('mercado-pago-btn');
    const registerForm = document.getElementById('register-form');

    // Admin functionality
    const appTitle = document.getElementById('app-title');
    const adminModal = document.getElementById('admin-modal');
    const closeAdminModalBtn = adminModal.querySelector('.admin-close');
    const addWorkerBtn = document.getElementById('add-worker-btn');
    const adminForm = document.getElementById('admin-form');
    const workerIdInput = document.getElementById('worker-id-input');
    const adminLoginLink = document.getElementById('admin-login-link');
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminLoginForm = document.getElementById('admin-login-form');
    const closeAdminLoginModalBtn = adminLoginModal.querySelector('.admin-login-close');
    const logoutBtn = document.getElementById('logout-btn');

    // Privacy Policy
    const privacyPolicyLink = document.getElementById('privacy-policy-link');
    const privacyModal = document.getElementById('privacy-modal');
    const closePrivacyModalBtn = privacyModal.querySelector('.privacy-close');

    // Terms and Conditions
    const termsLink = document.getElementById('terms-link');
    const termsModal = document.getElementById('terms-modal');
    const closeTermsModalBtn = termsModal.querySelector('.terms-close');

    // Dark Mode
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    let titleClickCount = 0;
    let isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    const ADMIN_EMAIL = 'appservicioscordoba@gmail.com';

    let activeCity = 'Córdoba'; // Default city

    function initializeAdmin() {
        if (isAdmin) {
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');
            document.querySelectorAll('.admin-controls').forEach(el => el.style.display = 'flex');
        } else {
             document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
             document.querySelectorAll('.admin-controls').forEach(el => el.style.display = 'none');
        }

        adminLoginLink.addEventListener('click', e => {
            e.preventDefault();
            if (!isAdmin) {
                adminLoginModal.style.display = 'block';
            } else {
                alert('Ya has iniciado sesión como administrador.');
            }
        });
        
        closeAdminLoginModalBtn.addEventListener('click', () => {
            adminLoginModal.style.display = 'none';
        });

        adminLoginForm.addEventListener('submit', e => {
            e.preventDefault();
            const password = document.getElementById('admin-password').value;
            checkAdminPassword(password);
            document.getElementById('admin-password').value = '';
        });

        logoutBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                sessionStorage.removeItem('isAdmin');
                window.location.reload();
            }
        });
    }

    function checkAdminPassword(password) {
        let storedPassword = localStorage.getItem('adminPassword');
        const errorMessage = document.getElementById('admin-login-error');
        
        if (storedPassword) {
            if (password === storedPassword) {
                alert(`¡Bienvenido de nuevo, ${ADMIN_EMAIL}!`);
                adminLoginModal.style.display = 'none';
                errorMessage.style.display = 'none';
                enableAdminMode();
            } else {
                errorMessage.textContent = 'Clave incorrecta.';
                errorMessage.style.display = 'block';
            }
        } else {
            // First time login
            const confirmFirstPassword = prompt(`No se encontró una clave. Crea tu clave de administrador para ${ADMIN_EMAIL}:`);
            if (confirmFirstPassword && confirmFirstPassword === password) {
                localStorage.setItem('adminPassword', confirmFirstPassword);
                alert(`Clave guardada. ¡Bienvenido, ${ADMIN_EMAIL}!`);
                adminLoginModal.style.display = 'none';
                errorMessage.style.display = 'none';
                enableAdminMode();
            } else if (confirmFirstPassword) {
                 errorMessage.textContent = 'La clave ingresada no coincide con la que acabas de crear.';
                 errorMessage.style.display = 'block';
            }
        }
    }

    function enableAdminMode() {
        isAdmin = true;
        sessionStorage.setItem('isAdmin', 'true');
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');
        applyFilters(); // Re-render to show admin controls
    }
    
    function applyWorkerOverrides(workersToOverride) {
        const overrides = JSON.parse(localStorage.getItem('workerOverrides')) || {};
        return workersToOverride.map(worker => {
            if (overrides[worker.id]) {
                return { ...worker, ...overrides[worker.id] };
            }
            return worker;
        });
    }
    
    function saveWorkerOverride(worker) {
        const overrides = JSON.parse(localStorage.getItem('workerOverrides')) || {};
        overrides[worker.id] = worker;
        localStorage.setItem('workerOverrides', JSON.stringify(overrides));
    }

    function loadCustomWorkers() {
        const customWorkers = JSON.parse(localStorage.getItem('customWorkers')) || [];
        const now = new Date().getTime();
        const expirationTime = 25 * 24 * 60 * 60 * 1000; // 25 days in milliseconds

        const validCustomWorkers = customWorkers.filter(worker => {
            return (now - worker.createdAt) < expirationTime;
        });

        if (validCustomWorkers.length !== customWorkers.length) {
            localStorage.setItem('customWorkers', JSON.stringify(validCustomWorkers));
        }
        
        // Combine original workers with valid custom workers after applying overrides
        const baseWorkers = applyWorkerOverrides(workers);
        allWorkers = [...baseWorkers, ...validCustomWorkers];
    }
    
    function saveCustomWorker(worker) {
        let customWorkers = JSON.parse(localStorage.getItem('customWorkers')) || [];
        const existingIndex = customWorkers.findIndex(w => w.id === worker.id);
        
        if (existingIndex > -1) {
            customWorkers[existingIndex] = worker;
        } else {
            worker.id = Date.now(); // a unique ID for new workers
            worker.createdAt = new Date().getTime();
            customWorkers.push(worker);
        }
        
        localStorage.setItem('customWorkers', JSON.stringify(customWorkers));
        loadCustomWorkers(); // Reload all workers
    }
    
     function deleteCustomWorker(workerId) {
        let customWorkers = JSON.parse(localStorage.getItem('customWorkers')) || [];
        const updatedWorkers = customWorkers.filter(w => w.id !== workerId);
        localStorage.setItem('customWorkers', JSON.stringify(updatedWorkers));
        loadCustomWorkers();
    }

    function getUniqueCategories() {
        const categories = new Set(allWorkers.map(worker => worker.category));
        return [...categories];
    }

    function populateCategoryFilter() {
        const currentCategory = categoryFilter.value;
        categoryFilter.innerHTML = '<option value="all">Todas las categorías</option>';
        const categories = getUniqueCategories();
        categories.sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            if (category === currentCategory) {
                option.selected = true;
            }
            categoryFilter.appendChild(option);
        });
    }

    function generateRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        let starsHTML = '';
        starsHTML += '★'.repeat(fullStars);
        if (halfStar) starsHTML += '½';
        starsHTML += '☆'.repeat(emptyStars);
        return starsHTML;
    }

    function renderWorkers(filteredWorkers) {
        workersGrid.innerHTML = '';
        if (filteredWorkers.length === 0) {
            workersGrid.innerHTML = '<p>No se encontraron trabajadores que coincidan con los filtros.</p>';
            return;
        }

        filteredWorkers.forEach(worker => {
            if (worker.hidden) return;
            const card = workerCardTemplate.content.cloneNode(true);
            const workerCard = card.querySelector('.worker-card');

            workerCard.dataset.workerId = worker.id;
            card.querySelector('.worker-photo').src = worker.photo;
            card.querySelector('.worker-photo').alt = `Foto de ${worker.name}`;
            if (worker.isAnonymous) {
                card.querySelector('.worker-name').textContent = worker.category;
                card.querySelector('.worker-category').style.display = 'none';
            } else {
                card.querySelector('.worker-name').textContent = worker.name;
                card.querySelector('.worker-category').textContent = worker.category;
            }
            card.querySelector('.worker-location').textContent = `${worker.location.city}, ${worker.location.province}`;
            card.querySelector('.rating-stars').textContent = generateRatingStars(worker.rating);
            card.querySelector('.rating-reviews').textContent = `(${worker.reviews || 0} reseñas)`;
            
            if (isAdmin) {
                card.querySelector('.admin-controls').style.display = 'flex';
            }
            
            workersGrid.appendChild(card);
        });
    }

    function applyFilters() {
        const locationQuery = locationFilter.value.toLowerCase().trim();
        const categoryQuery = categoryFilter.value;
        const mainCities = ["Córdoba", "Villa Carlos Paz", "Río Cuarto", "Villa María", "San Francisco", "Alta Gracia", "Río Tercero", "La Calera", "Bell Ville", "Villa Allende"];

        const filteredWorkers = allWorkers.filter(worker => {
            const matchesActiveCity = activeCity === 'other' 
                ? !mainCities.includes(worker.location.city)
                : worker.location.city === activeCity;

            const matchesLocation = locationQuery === '' || 
                                    worker.location.city.toLowerCase().includes(locationQuery) ||
                                    worker.location.province.toLowerCase().includes(locationQuery) ||
                                    (worker.location.neighborhood && worker.location.neighborhood.toLowerCase().includes(locationQuery));
            
            const matchesCategory = categoryQuery === 'all' || worker.category === categoryQuery;

            return matchesActiveCity && matchesLocation && matchesCategory;
        });

        renderWorkers(filteredWorkers);
    }

    function showWorkerModal(workerId) {
        const worker = allWorkers.find(w => w.id === parseInt(workerId));
        if (!worker) return;

        const contactButtonHTML = worker.isAnonymous
            ? `<p class="register-to-contact">Regístrese para ver el contacto.</p>`
            : `<a href="https://wa.me/${worker.phone}?text=Hola%20${encodeURIComponent(worker.name)},%20te%20contacto%20desde%20Oficios%20Córdoba%20para%20consultar%20por%20tus%20servicios%20de%20${encodeURIComponent(worker.category)}." class="whatsapp-button" target="_blank" rel="noopener noreferrer">Contactar por WhatsApp</a>`;

        modalBody.innerHTML = `
            <img src="${worker.photo}" alt="Foto de ${worker.name}">
            <h2>${worker.isAnonymous ? worker.category : worker.name}</h2>
            <p class="category">${worker.isAnonymous ? 'Profesional verificado' : worker.category}</p>
            <p class="location">${worker.location.city}, ${worker.location.province}</p>
            <div class="worker-rating">
                <span class="rating-stars" style="font-size: 1.5rem; color: var(--secondary-color);">${generateRatingStars(worker.rating)}</span>
                <span class="rating-reviews" style="font-size: 1rem; margin-left: 10px;">${worker.rating.toFixed(1)} de ${worker.reviews || 0} reseñas</span>
            </div>
            <p class="description">${worker.description.replace(/\n/g, '<br>')}</p>
            ${contactButtonHTML}
        `;
        workerModal.style.display = 'block';
    }

    // Event Listeners
    locationFilter.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    
    locationTabs.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelector('.location-tab.active').classList.remove('active');
            e.target.classList.add('active');
            activeCity = e.target.dataset.city;
            locationFilter.value = ''; // Reset text filter
            applyFilters();
        }
    });

    workersGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.worker-card');
        if (!card) return;
        
        const workerId = parseInt(card.dataset.workerId);

        if (e.target.classList.contains('edit-btn')) {
            openAdminForm(workerId);
        } else if (e.target.classList.contains('delete-btn')) {
            if (confirm('¿Estás seguro de que quieres ocultar a este profesional?')) {
                const worker = allWorkers.find(w => w.id === workerId);
                // For original workers, just hide. For custom, delete.
                if (worker.createdAt) {
                     deleteCustomWorker(workerId);
                } else {
                    worker.hidden = true; // This is a temporary hide for the session
                    // To make it persistent, we could add it to overrides, but for now this is fine.
                }
                applyFilters();
            }
        } else {
            showWorkerModal(card.dataset.workerId);
        }
    });

    closeModalButton.addEventListener('click', () => {
        workerModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === workerModal) {
            workerModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
        if (e.target === adminLoginModal) {
            adminLoginModal.style.display = 'none';
        }
        if (e.target === privacyModal) {
            privacyModal.style.display = 'none';
        }
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
        }
    });

    // Dark Mode Logic
    function setDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            darkModeToggle.textContent = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        setDarkMode(!isDarkMode);
    });

    // Register Modal Logic
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'block';
    });

    closeRegisterModalBtn.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically collect the form data
        const registrationData = {
            name: document.getElementById('reg-name').value,
            category: document.getElementById('reg-category').value,
            phone: document.getElementById('reg-phone').value,
            city: document.getElementById('reg-city').value,
            neighborhood: document.getElementById('reg-neighborhood').value,
            description: document.getElementById('reg-description').value,
            // For file inputs, we can get file info. Actual upload would need a server.
            profilePhoto: document.getElementById('reg-photo').files[0],
            localPhoto: document.getElementById('reg-local-photo').files[0],
            dniPhoto: document.getElementById('reg-dni').files[0],
            selfie: document.getElementById('reg-selfie').files[0],
        };
        console.log("Datos de registro:", registrationData);

        alert('¡Gracias por tu interés! Tus datos fueron recibidos. El siguiente paso sería el pago con Mercado Pago, cuya integración está en desarrollo. ¡Vuelve pronto!');
        
        registerForm.reset();
        registerModal.style.display = 'none';
    });

    mercadoPagoBtn.addEventListener('click', (e) => {
        // Prevent form submission if the button is of type submit
        if (registerForm.checkValidity()) {
             alert('Gracias por tu interés. La pasarela de pago de Mercado Pago se encuentra en desarrollo. ¡Vuelve pronto!');
        } else {
            // Let the browser show validation errors
            // We do nothing here so the 'submit' event can trigger native validation.
        }
    });

    // Privacy Policy Logic
    privacyPolicyLink.addEventListener('click', (e) => {
        e.preventDefault();
        privacyModal.style.display = 'block';
    });

    closePrivacyModalBtn.addEventListener('click', () => {
        privacyModal.style.display = 'none';
    });

    // Terms and Conditions Logic
    termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        termsModal.style.display = 'block';
    });

    closeTermsModalBtn.addEventListener('click', () => {
        termsModal.style.display = 'none';
    });

    // Admin Modal Logic
    addWorkerBtn.addEventListener('click', () => {
        openAdminForm();
    });

    closeAdminModalBtn.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });

    function openAdminForm(workerId = null) {
        adminForm.reset();
        workerIdInput.value = '';
        if (workerId) {
            const worker = allWorkers.find(w => w.id === workerId);
            if (worker) {
                workerIdInput.value = worker.id;
                document.getElementById('worker-name').value = worker.name;
                document.getElementById('worker-category-input').value = worker.category;
                document.getElementById('worker-photo-input').value = worker.photo;
                document.getElementById('worker-city').value = worker.location.city;
                document.getElementById('worker-neighborhood').value = worker.location.neighborhood || '';
                document.getElementById('worker-phone').value = worker.phone;
                document.getElementById('worker-description').value = worker.description;
            }
        }
        adminModal.style.display = 'block';
    }

    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = workerIdInput.value ? parseInt(workerIdInput.value) : null;
        
        const workerData = {
            id: id,
            name: document.getElementById('worker-name').value,
            category: document.getElementById('worker-category-input').value,
            photo: document.getElementById('worker-photo-input').value,
            location: {
                city: document.getElementById('worker-city').value,
                province: "Córdoba",
                neighborhood: document.getElementById('worker-neighborhood').value,
            },
            phone: document.getElementById('worker-phone').value,
            description: document.getElementById('worker-description').value,
            rating: 0, // Default for new workers
            reviews: 0
        };

        if (id) { // Editing existing worker
            const index = allWorkers.findIndex(w => w.id === id);
            if (index > -1) {
                const originalWorker = allWorkers[index];
                workerData.rating = originalWorker.rating; // Keep original rating
                workerData.reviews = originalWorker.reviews;
                
                // If it's a custom worker, update it in localStorage's customWorkers
                if (originalWorker.createdAt) {
                    workerData.createdAt = originalWorker.createdAt;
                    saveCustomWorker(workerData);
                } else {
                    // If it's an original worker, save an override
                    saveWorkerOverride(workerData);
                    loadCustomWorkers(); // Reload all workers to apply the override
                }
            }
        } else { // Adding new worker
            saveCustomWorker(workerData);
        }
        
        adminModal.style.display = 'none';
        populateCategoryFilter();
        applyFilters();
    });

    // Initial Load
    if (localStorage.getItem('darkMode') === 'enabled') {
        setDarkMode(true);
    }
    loadCustomWorkers();
    populateCategoryFilter();
    applyFilters();
    initializeAdmin();
});