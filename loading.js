document.addEventListener('DOMContentLoaded', function() {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (!progressFill || !progressPercentage) {
        // If elements don't exist, redirect immediately
        setTimeout(() => {
            window.location.href = 'watch.html';
        }, 100);
        return;
    }
    
    let progress = 0;
    const duration = 3000; // 3 seconds
    const interval = 20; // Update every 20ms
    const increment = 100 / (duration / interval);
    
    const progressInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            progressFill.style.width = '100%';
            progressPercentage.textContent = '100%';
            
            // Fade out and redirect
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.classList.add('fade-out');
                }
                setTimeout(() => {
                    window.location.href = 'watch.html';
                }, 500);
            }, 500);
        } else {
            progressFill.style.width = progress + '%';
            progressPercentage.textContent = Math.round(progress) + '%';
        }
    }, interval);
});
