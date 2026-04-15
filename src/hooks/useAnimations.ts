import { useEffect } from 'react';

export const useAnimations = () => {
    useEffect(() => {
        // Reveal & Stagger Animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // If the element has a .counter-up class, trigger counter logic
                    if (entry.target.classList.contains('counter-up') && !entry.target.hasAttribute('data-counted')) {
                        entry.target.setAttribute('data-counted', 'true');
                        const targetStr = entry.target.getAttribute('data-target') || '0';
                        const prefix = entry.target.getAttribute('data-prefix') || '';
                        const suffix = entry.target.getAttribute('data-suffix') || '';
                        const duration = parseInt(entry.target.getAttribute('data-duration') || '1500');
                        const targetNum = parseFloat(targetStr);
                        const isFloat = targetStr.includes('.') && !targetStr.endsWith('.0');

                        let start: number | null = null;
                        const el = entry.target;

                        function tick(now: number) {
                            if (!start) start = now;
                            const p = Math.min((now - start) / duration, 1);
                            const eased = 1 - Math.pow(1 - p, 3);
                            const val = targetNum * eased;

                            if (isFloat) {
                                el.textContent = prefix + val.toFixed(1) + suffix;
                            } else {
                                el.textContent = prefix + (Math.round(val)).toLocaleString('en-US').replace(/,/g, '.') + suffix;
                            }

                            if (p < 1) requestAnimationFrame(tick);
                        }
                        requestAnimationFrame(tick);
                    }
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        // Select all items to animate
        const elementsToAnim = document.querySelectorAll('.reveal, .reveal-stagger > *, .counter-up');
        elementsToAnim.forEach(el => observer.observe(el));

        // Scroll Progress Bar
        const progressBar = document.querySelector('.scroll-bar') as HTMLElement;
        const handleScroll = () => {
            if (!progressBar) return;
            const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${pct}%`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            elementsToAnim.forEach(el => observer.unobserve(el));
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
};
