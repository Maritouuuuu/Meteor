document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para el menú de navegación responsive
    const nav = document.querySelector('nav ul');
    const menuToggle = document.createElement('button');
    menuToggle.textContent = '☰';
    menuToggle.className = 'menu-toggle';
    document.querySelector('nav').appendChild(menuToggle);

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
    });

    // Efecto de parallax para el hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    });

    // Animación para los elementos al hacer scroll
    const animateOnScroll = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .tech-item, .testimonial, .server-card, .course-card, .category-card, .benefit-item, .faq-item').forEach(item => {
        observer.observe(item);
    });

    // Funcionalidad para el slider de testimonios
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.style.display = 'none');
        testimonials[index].style.display = 'block';
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);
        setInterval(nextTestimonial, 5000); // Cambia cada 5 segundos
    }

    // Efecto hover para las tarjetas de servidor
    const serverCards = document.querySelectorAll('.server-card');
    serverCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Animación de contador para estadísticas
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const updateCount = () => {
            const increment = target / 200;
            if (count < target) {
                count += increment;
                stat.innerText = Math.ceil(count);
                setTimeout(updateCount, 10);
            } else {
                stat.innerText = target;
            }
        };
        updateCount();
    });

    // Validación de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            form.querySelectorAll('input, textarea').forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            if (isValid) {
                alert('Formulario enviado con éxito!');
                form.reset();
            } else {
                alert('Por favor, complete todos los campos requeridos.');
            }
        });
    });

    // Efecto de typing para el hero
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }
});