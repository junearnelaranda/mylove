document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const nameInput = document.getElementById('nameInput');
    const enterBtn = document.getElementById('enterBtn');
    const errorMessage = document.getElementById('errorMessage');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const heartsContainer = document.getElementById('hearts-container');
    const themeToggle = document.getElementById('themeToggle');
    const loveModal = document.getElementById('loveModal');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    const targetName = "Shairyl Banzon Casili";

    // Theme Toggle Logic
    const toggleTheme = () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeToggle.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeToggle.innerHTML = '☀️';
    } else {
        themeToggle.innerHTML = '🌙';
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Surprise Button and Modal Logic
    surpriseBtn.addEventListener('click', () => {
        loveModal.classList.remove('hidden');
    });

    yesBtn.addEventListener('click', () => {
        window.location.href = 'surprise.html';
    });

    const moveButton = () => {
        const modalContent = document.querySelector('.modal-content');
        
        // Calculate bounds within the modal content
        const padding = 15; // Slightly less padding for mobile
        const maxX = modalContent.clientWidth - noBtn.offsetWidth - padding;
        const maxY = modalContent.clientHeight - noBtn.offsetHeight - padding;
        
        // Random position within the card, ensuring it doesn't overlap labels too much
        const randomX = Math.max(padding, Math.random() * maxX);
        const randomY = Math.max(padding, Math.random() * maxY);
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.margin = '0';
    };

    // Jump effect: move when the mouse enters or touches
    noBtn.addEventListener('mouseenter', moveButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    }, { passive: false });

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });

    // Function to handle login
    const handleLogin = () => {
        const enteredName = nameInput.value.trim();
        
        // Case-insensitive check to be more forgiving
        if (enteredName.toLowerCase() === targetName.toLowerCase()) {
            // Success
            loginScreen.classList.add('hidden');
            setTimeout(() => {
                mainContent.classList.remove('hidden');
            }, 500);
        } else if (enteredName === "") {
            errorMessage.textContent = "Please enter your name first.";
        } else {
            errorMessage.textContent = "Oops! That's not the name I'm looking for.";
            nameInput.value = "";
        }
    };

    // Event Listeners
    enterBtn.addEventListener('click', handleLogin);

    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });

    // Background Hearts Animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        
        const startX = Math.random() * 100;
        const duration = Math.random() * 3 + 3;
        const size = Math.random() * 20 + 10;
        
        heart.style.left = `${startX}vw`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Create hearts periodically
    setInterval(createHeart, 300);
});
