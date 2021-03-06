'use strict'

const navbar = document.querySelector("nav");
const navbarHeight = navbar.getBoundingClientRect().height;

// 내비게이션 바가 내려가면 색상이 바뀜
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});




// 메뉴 누를때 스크롤시켜주는 기능
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItem(target);
});

// 토글버튼
const toggle = document.querySelector('.nav__toggle-btn');

toggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
} )



const contactme = document.querySelector(".contactme");
contactme.addEventListener('click', (event) => {
    scrollIntoView('.talk');
});

// 스크롤 내리면 메인 사라지는 기능
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
})


// 누르면 사이트 맨위로 이동하는 버튼

const siteup = document.querySelector(".site__up")
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight){
        siteup.classList.remove('site__up-dark');
    } else {
        siteup.classList.add('site__up-dark');
    }
});

siteup.addEventListener('click', (event) => {
    scrollIntoView('.home');
});


// 프로젝트
const workBtn = document.querySelector(".work__category");
const workProject = document.querySelector(".work__project");
const projects = document.querySelectorAll(".project");
workBtn.addEventListener('click', (event) => {
    const filter = event.target.dataset.filter;
const active = document.querySelector('.category__btn.active');
active.classList.remove('active');
event.target.classList.add('active');
    workProject.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
                
            }
        });
        workProject.classList.remove('anim-out');
    },300)
});

const sectionClass = ['.home', '.about', '.skills', '.work', '.testimonial', '.talk'];

const sections = sectionClass.map(id => document.querySelector(id));
const navItems = sectionClass.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
    selectNavItem(navItems[sectionClass.indexOf(selector)]);
}

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}
const observerCallback = (entries, observer) =>{
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionClass.indexOf(`.${entry.target.className}`);
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
    });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (window.scrollY + window.innerHeight === document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});