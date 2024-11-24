let cookieCount = 0;
let clickTimes = [];
let bestStreak = 0;
let currentStreak = 0;
let lastClickTime = 0;

function calculateCPS() {
    const now = Date.now();
    // Remove clicks older than 1 second
    clickTimes = clickTimes.filter(time => now - time < 1000);
    return clickTimes.length;
}

function updateStats() {
    document.getElementById('cps').textContent = calculateCPS().toFixed(1);
    document.getElementById('streak').textContent = bestStreak;
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = `${Math.random() * 10 + 5}px`;
    sparkle.style.height = sparkle.style.width;
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        document.body.removeChild(sparkle);
    }, 1000);
}

function createFloatingCookie(x, y) {
    const cookie = document.createElement('div');
    cookie.textContent = '🍪';
    cookie.style.position = 'fixed';
    cookie.style.fontSize = '2rem';
    cookie.style.pointerEvents = 'none';
    cookie.style.zIndex = '1000';
    cookie.style.left = `${x}px`;
    cookie.style.top = `${y}px`;
    cookie.style.opacity = '1';
    cookie.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    
    document.body.appendChild(cookie);
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 100;
    const finalX = x + Math.cos(angle) * distance;
    const finalY = y - 150 - Math.random() * 100;
    
    requestAnimationFrame(() => {
        cookie.style.transform = `translate(${finalX - x}px, ${finalY - y}px) rotate(${Math.random() * 360}deg)`;
        cookie.style.opacity = '0';
    });
    
    setTimeout(() => {
        document.body.removeChild(cookie);
    }, 1000);
}

function giveCookie(event) {
    cookieCount++;
    const now = Date.now();
    clickTimes.push(now);
    
    // Update cookie count with animation
    const cookieCountElement = document.getElementById('cookieCount');
    cookieCountElement.textContent = `${cookieCount} cookie${cookieCount === 1 ? '' : 's'}`;
    cookieCountElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        cookieCountElement.style.transform = 'scale(1)';
    }, 100);
    
    // Calculate streak
    if (now - lastClickTime < 500) {
        currentStreak++;
        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
        }
    } else {
        currentStreak = 1;
    }
    lastClickTime = now;
    
    // Create visual effects
    const button = document.querySelector('.cookie-button');
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create multiple sparkles
    for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5;
        const distance = 30;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        createSparkle(x, y);
    }
    
    // Create floating cookies
    for (let i = 0; i < 3; i++) {
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        createFloatingCookie(x, y);
    }
    
    updateStats();
}

// Update CPS counter every 100ms
setInterval(updateStats, 100);
