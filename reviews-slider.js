/* ============================================
   Reviews slider: slow endless drift that can be
   dragged, swiped or moved with the arrow keys.
   The motion logic (createDrift) has no DOM access
   so it can be unit tested: node --test tests/
   ============================================ */

(function (root) {
    const SPEED = 0.35;      // px per frame while drifting
    const FRICTION = 0.94;   // how quickly a drag glide slows down
    const RESUME_MS = 1000;  // pause after an interaction before drifting again

    function createDrift({ reduceMotion = false } = {}) {
        let pos = 1, velocity = 0, loopWidth = 0;
        let dragging = false, holdUntil = 0, lastX = 0;

        // Keep the position inside the first copy of the cards so it never runs out
        function wrap() {
            if (!loopWidth) return;
            if (pos >= loopWidth) pos -= loopWidth;
            else if (pos < 1) pos += loopWidth;
        }
        const hold = (now, ms = RESUME_MS) => { holdUntil = now + ms; };

        return {
            get pos() { return pos; },
            setLoopWidth(width) { loopWidth = width; wrap(); },

            dragStart(x) { dragging = true; lastX = x; velocity = 0; },
            dragMove(x) {
                if (!dragging) return;
                velocity = x - lastX;
                lastX = x;
                pos -= velocity;
                wrap();
            },
            dragEnd(now) {
                if (!dragging) return;
                dragging = false;
                hold(now);
            },

            // Touch or wheel scrolling: the browser moves the row, we just wait
            interact(now) { hold(now); },
            // Arrow keys: glide one step in the given direction (1 = forward)
            nudge(now, dir) { hold(now); velocity = -18 * dir; },

            // Pick up position changes the browser made (swipe, wheel).
            // Skipped mid-drag: the page lags our position until the next frame.
            syncFrom(scrollLeft) {
                if (dragging) return;
                if (Math.abs(scrollLeft - pos) > 1.5) { pos = scrollLeft; wrap(); }
            },

            frame(now) {
                if (!dragging && Math.abs(velocity) > 0.1) {
                    pos -= velocity;
                    velocity *= FRICTION;
                } else if (!reduceMotion && !dragging && now > holdUntil) {
                    pos += SPEED;
                }
                wrap();
                return pos;
            }
        };
    }

    function initReviewsSlider(track) {
        const row = track.querySelector('.reviews-row');
        Array.from(row.children).forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            row.appendChild(clone);
        });

        const drift = createDrift({
            reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        });
        const measure = () => drift.setLoopWidth(row.scrollWidth / 2);
        measure();
        window.addEventListener('resize', measure);

        track.addEventListener('touchstart', () => drift.interact(performance.now()), { passive: true });
        track.addEventListener('wheel', () => drift.interact(performance.now()), { passive: true });

        track.addEventListener('pointerdown', e => {
            if (e.pointerType !== 'mouse' || e.button !== 0) return;
            drift.dragStart(e.clientX);
            track.setPointerCapture(e.pointerId);
            track.classList.add('is-dragging');
        });
        track.addEventListener('pointermove', e => drift.dragMove(e.clientX));
        const endDrag = () => {
            drift.dragEnd(performance.now());
            track.classList.remove('is-dragging');
        };
        track.addEventListener('pointerup', endDrag);
        track.addEventListener('pointercancel', endDrag);

        track.addEventListener('keydown', e => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            e.preventDefault();
            drift.nudge(performance.now(), e.key === 'ArrowRight' ? 1 : -1);
        });

        function tick(now) {
            drift.syncFrom(track.scrollLeft);
            track.scrollLeft = drift.frame(now);
            requestAnimationFrame(tick);
        }
        track.scrollLeft = drift.pos;
        requestAnimationFrame(tick);
    }

    root.ReviewsSlider = { createDrift, initReviewsSlider };
    if (typeof module !== 'undefined') module.exports = { createDrift };

    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', () => {
            const track = document.getElementById('reviewsTrack');
            if (track) initReviewsSlider(track);
        });
    }
})(typeof window !== 'undefined' ? window : globalThis);
