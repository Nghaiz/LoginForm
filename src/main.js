const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const navBtnPopUp = document.querySelector('.btn-popUp');
const iconClose = document.querySelector('.icon-close');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

// Chuyển đổi menu trên mobile
menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Đóng menu mobile khi click vào link
const navLinks = document.querySelectorAll('.navigation a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Chức năng gốc
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

navBtnPopUp.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    // Đóng menu mobile khi nhấn nút login
    navigation.classList.remove('active');
    menuToggle.classList.remove('active');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Xử lý khi resize màn hình
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navigation.classList.contains('active')) {
        navigation.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Thêm hiệu ứng cuộn cho header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(22, 41, 56, 0.9)';
        header.style.padding = '10px 5%';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.2)';
        header.style.padding = '20px 5%';
    }
});