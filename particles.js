/* ============================================
   PARTICLE SYSTEM - GOLD DUST BACKGROUND
   ============================================ */

(function() {
    'use strict';

    // Canvas and context variables
    let canvas;
    let ctx;
    let particles = [];
    let animationFrameId;

    // Particle configuration
    const PARTICLE_COUNT = 200; // Number of particles
    const PARTICLE_SIZE_MIN = 1.5;
    const PARTICLE_SIZE_MAX = 3.5;
    const PARTICLE_SPEED_MIN = 0.1;
    const PARTICLE_SPEED_MAX = 0.5;
    const PARTICLE_COLOR = 'rgba(255, 215, 0, 0.5)'; // Gold color with 50% opacity

    // Resize canvas to fill window
    function resizeCanvas() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    // Particle class
    class Particle {
        constructor() {
            this.reset();
            // Random starting position
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }

        reset() {
            // Random position
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            
            // Random size
            this.size = Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN;
            
            // Random velocity (slow movement)
            this.vx = (Math.random() - 0.5) * (Math.random() * (PARTICLE_SPEED_MAX - PARTICLE_SPEED_MIN) + PARTICLE_SPEED_MIN);
            this.vy = (Math.random() - 0.5) * (Math.random() * (PARTICLE_SPEED_MAX - PARTICLE_SPEED_MIN) + PARTICLE_SPEED_MIN);
            
            // Random opacity variation for depth
            this.opacity = Math.random() * 0.4 + 0.3; // Between 0.3 and 0.7 (more visible)
            
            // Twinkle animation properties
            this.twinklePhase = Math.random() * Math.PI * 2; // Random starting phase (0-2π)
            this.twinkleSpeed = Math.random() * 0.02 + 0.01; // Slow twinkle speed (0.01-0.03)
        }

        update() {
            // Update position
            this.x += this.vx;
            this.y += this.vy;

            // Add slight random drift for floating effect
            this.vx += (Math.random() - 0.5) * 0.01;
            this.vy += (Math.random() - 0.5) * 0.01;

            // Limit velocity to keep movement slow
            const maxVel = PARTICLE_SPEED_MAX;
            this.vx = Math.max(-maxVel, Math.min(maxVel, this.vx));
            this.vy = Math.max(-maxVel, Math.min(maxVel, this.vy));

            // Wrap around edges
            if (this.x < 0) {
                this.x = canvas.width;
            } else if (this.x > canvas.width) {
                this.x = 0;
            }

            if (this.y < 0) {
                this.y = canvas.height;
            } else if (this.y > canvas.height) {
                this.y = 0;
            }
        }

        draw() {
            // Calculate twinkling opacity using sine wave
            const twinkleOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.twinklePhase));
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${twinkleOpacity})`;
            ctx.fill();
        }
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    // Handle window resize
    function handleResize() {
        resizeCanvas();
        // Reinitialize particles to distribute them across new canvas size
        initParticles();
    }

    // Initialize on page load
    function init() {
        // Get canvas element
        canvas = document.getElementById('particleCanvas');
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }

        // Get context
        ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Could not get 2D context');
            return;
        }

        // Initialize canvas size
        resizeCanvas();

        // Initialize particles
        initParticles();
        console.log('Particles initialized:', particles.length);

        // Start animation
        animate();
        console.log('Animation started');
    }

    // Event listeners
    window.addEventListener('resize', handleResize, { passive: true });

    // Start animation when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already loaded
        init();
    }

    // Cleanup function (optional, for when you need to stop the animation)
    window.stopParticles = function() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    };

    // Restart function (optional)
    window.startParticles = function() {
        if (!animationFrameId) {
            animate();
        }
    };

})();
