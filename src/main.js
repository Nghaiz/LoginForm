import Navigo from 'navigo';

const router = new Navigo('/');

const appContent = document.getElementById('app-content');
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const iconClose = document.querySelector('.icon-close');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const checkAuth = () => {
    return localStorage.getItem('currentUser') !== null;
};

const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};

const renderHomePage = () => {
    const isLoggedIn = checkAuth();
    const user = isLoggedIn ? getCurrentUser() : null;

    let html = `
        <div class="welcome-container">
            <div class="welcome-header">
                <h1 class="animate-pop">Welcome${isLoggedIn ? `, <span>${user.username}</span>` : ''}!</h1>
                <p class="subtitle animate-fade">Your journey starts here</p>
            </div>
            
            <div class="welcome-cards">
                <div class="info-card animate-slide">
                    <div class="card-icon">
                        <ion-icon name="globe-outline"></ion-icon>
                    </div>
                    <h3>Explore the World</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                
                <div class="info-card animate-slide" style="animation-delay: 0.2s">
                    <div class="card-icon">
                        <ion-icon name="people-outline"></ion-icon>
                    </div>
                    <h3>Connect with Others</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                
                <div class="info-card animate-slide" style="animation-delay: 0.4s">
                    <div class="card-icon">
                        <ion-icon name="rocket-outline"></ion-icon>
                    </div>
                    <h3>Achieve Your Goals</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
            
            <div class="welcome-actions animate-fade" style="animation-delay: 0.6s">
    `;

    if (isLoggedIn) {
        html += `
                <a href="/profile" class="action-button" data-navigo>
                    <ion-icon name="person-outline"></ion-icon>
                    View Profile
                </a>
                <button class="action-button secondary" id="explore-btn">
                    <ion-icon name="compass-outline"></ion-icon>
                    Explore Platform
                </button>
        `;
    } else {
        html += `
                <button class="action-button" id="home-login-btn">
                    <ion-icon name="log-in-outline"></ion-icon>
                    Login to Continue
                </button>
                <button class="action-button secondary" id="home-register-btn">
                    <ion-icon name="person-add-outline"></ion-icon>
                    Create Account
                </button>
        `;
    }

    html += `
            </div>
            
            <div class="welcome-footer animate-fade" style="animation-delay: 0.8s">
                <div class="stats">
                    <div class="stat-item">
                        <span class="stat-number">🗿1.2K+</span>
                        <span class="stat-label">Users</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">🌟4.8</span>
                        <span class="stat-label">Rating</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">☎️24/7</span>
                        <span class="stat-label">Support</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    appContent.innerHTML = html;

    if (!isLoggedIn) {
        document.getElementById('home-login-btn').addEventListener('click', () => {
            wrapper.classList.add('active-popup');
            wrapper.classList.remove('active');
        });

        document.getElementById('home-register-btn').addEventListener('click', () => {
            wrapper.classList.add('active-popup');
            wrapper.classList.add('active');
        });
    }

    router.updatePageLinks();
};

const renderProfilePage = () => {
    const isLoggedIn = checkAuth();

    if (!isLoggedIn) {
        router.navigate('/');
        wrapper.classList.add('active-popup');
        return;
    }

    const user = getCurrentUser();

    const html = `
        <div class="profile-container animate-pop">
            <div class="profile-header">
                <div class="profile-close">
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <div class="profile-avatar">
                    <ion-icon name="person-circle-outline"></ion-icon>
                </div>
                <h2>User Information</h2>
            </div>
            <div class="profile-content">
                <div class="profile-info">
                    <div class="info-item">
                        <div class="info-label">Username</div>
                        <div class="info-value">${user.username}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email</div>
                        <div class="info-value">${user.email}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Account Status</div>
                        <div class="info-value"><span class="status-badge">Active</span></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    appContent.innerHTML = html;

    document.querySelector('.profile-close').addEventListener('click', () => {
        router.navigate('/');
    });
};

const updateNavigation = () => {
    const navElement = document.querySelector('.navigation');
    const isLoggedIn = checkAuth();
    const user = isLoggedIn ? getCurrentUser() : null;

    const oldLoginBtn = navElement.querySelector('.btn-popUp');
    const oldUserProfile = navElement.querySelector('.user-profile');

    if (oldLoginBtn) oldLoginBtn.remove();
    if (oldUserProfile) oldUserProfile.remove();

    if (isLoggedIn && user) {
        const userProfileHTML = `
            <div class="user-profile">
                <button class="profile-button">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <span>${user.username}</span>
                </button>
                <div class="profile-dropdown">
                    <a href="/profile" data-navigo>
                        <ion-icon name="person-outline"></ion-icon>
                        Profile
                    </a>
                    <a href="#" id="logout-btn">
                        <ion-icon name="log-out-outline"></ion-icon>
                        Logout
                    </a>
                    <a href="#">
                        <ion-icon name="help-circle-outline"></ion-icon>
                        Help
                    </a>
                </div>
            </div>
        `;
        navElement.insertAdjacentHTML('beforeend', userProfileHTML);

        const profileBtn = navElement.querySelector('.profile-button');
        const dropdown = navElement.querySelector('.profile-dropdown');

        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                }
            }
        });

        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            updateNavigation();
            renderHomePage();
        });

    } else {
        const loginBtn = document.createElement('button');
        loginBtn.className = 'btn-popUp';
        loginBtn.textContent = 'Login';
        navElement.appendChild(loginBtn);

        loginBtn.addEventListener('click', () => {
            wrapper.classList.add('active-popup');
            navigation.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    }

    router.updatePageLinks();
};

router
    .on('/', () => {
        renderHomePage();
    })
    .on('/profile', () => {
        renderProfilePage();
    })
    .notFound(() => {
        router.navigate('/');
    })
    .resolve();

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.remove('active');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.navigation a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            email: user.email
        }));

        wrapper.classList.remove('active-popup');
        loginForm.reset();
        updateNavigation();
        renderHomePage();
    } else {
        alert('Email hoặc mật khẩu không đúng!');
    }

    const auth = {
        email,
        password
    }

    fetch('https://auth-wit.vercel.app/auth/login', {
        method: 'POST',
        body: JSON.stringify(auth),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some(user => user.email === email)) {
        alert('Email đã được đăng ký, vui lòng sử dụng email khác!');
        return;
    }

    users.push({
        username,
        email,
        password
    });

    localStorage.setItem('users', JSON.stringify(users));

    registerForm.reset();
    wrapper.classList.remove('active');
    alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(27, 35, 71, 0.9)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.padding = '10px 5%';
    } else {
        header.style.background = 'rgba(27, 35, 71, 0.4)';
        header.style.backdropFilter = 'blur(8px)';
        header.style.padding = '20px 5%';
    }
});

updateNavigation();