// Run with: node --test tests/
const test = require('node:test');
const assert = require('node:assert/strict');
const { createDrift } = require('../reviews-slider.js');

const FRAME = 16;
const LOOP = 2000;

function setup(options) {
    const drift = createDrift(options);
    drift.setLoopWidth(LOOP);
    return drift;
}

// Advance the animation from `start` for `ms`, returning the end time
function run(drift, start, ms) {
    let t = start;
    for (; t < start + ms; t += FRAME) drift.frame(t);
    return t;
}

function isDrifting(drift, now) {
    const before = drift.pos;
    drift.frame(now);
    return drift.pos > before;
}

test('drifts forward on its own when nobody is interacting', () => {
    const drift = setup();
    const start = drift.pos;
    run(drift, 0, 1000);
    assert.ok(drift.pos > start);
});

test('resumes drifting after a drag (cursor may still be over the row)', () => {
    const drift = setup();
    drift.dragStart(500);
    drift.dragMove(450);
    drift.dragEnd(1000);
    const t = run(drift, 1000, 3000);
    assert.ok(isDrifting(drift, t), 'expected the row to drift again after the pause');
});

test('pauses for one second after a drag, then drifts again', () => {
    const drift = setup();
    drift.dragStart(500);
    drift.dragMove(500);        // no movement, so no glide
    drift.dragEnd(1000);
    const before = drift.pos;
    run(drift, 1000, 950);
    assert.equal(drift.pos, before, 'still during the pause');
    assert.ok(isDrifting(drift, 2010), 'drifting again after one second');
});

test('resumes after a touch on phones', () => {
    const drift = setup();
    drift.interact(0);
    const t = run(drift, 0, 1100);
    assert.ok(isDrifting(drift, t));
});

test('dragging moves the row opposite to the cursor', () => {
    const drift = setup();
    const start = drift.pos;
    drift.dragStart(500);
    drift.dragMove(400);        // drag left 100px -> content moves forward
    assert.equal(drift.pos, start + 100);
});

test('a drag is not undone by the next frame syncing from the page', () => {
    const drift = setup();
    const start = drift.pos;
    drift.dragStart(500);
    drift.dragMove(400);        // page has not caught up yet...
    drift.syncFrom(start);      // ...so the browser still reports the old position
    drift.frame(0);
    assert.equal(drift.pos, start + 100);
});

test('glides after a drag and gradually stops', () => {
    const drift = setup({ reduceMotion: true });   // no auto drift, so only the glide moves it
    drift.dragStart(500);
    drift.dragMove(470);
    drift.dragEnd(0);
    const released = drift.pos;
    drift.frame(FRAME);
    assert.ok(drift.pos > released, 'keeps moving after release');
    run(drift, FRAME, 3000);
    const settled = drift.pos;
    drift.frame(3100);
    assert.equal(drift.pos, settled, 'glide has come to rest');
});

test('wraps around in both directions so it never runs out', () => {
    const drift = setup();
    drift.dragStart(0);
    drift.dragMove(50);         // drag right past the start
    assert.ok(drift.pos > 0 && drift.pos < LOOP);
    drift.dragMove(50 - LOOP);  // drag far left past the end
    assert.ok(drift.pos >= 1 && drift.pos < LOOP);
});

test('arrow keys glide in the pressed direction', () => {
    const forward = setup();
    const start = forward.pos + 500;
    forward.syncFrom(start);
    forward.nudge(0, 1);
    run(forward, 0, 1000);
    assert.ok(forward.pos > start);

    const back = setup();
    back.syncFrom(start);
    back.nudge(0, -1);
    run(back, 0, 1000);
    assert.ok(back.pos < start);
});

test('picks up swipes made by the browser', () => {
    const drift = setup();
    drift.syncFrom(800);
    assert.equal(drift.pos, 800);
});

test('with reduced motion it never moves on its own, but dragging still works', () => {
    const drift = setup({ reduceMotion: true });
    const start = drift.pos;
    run(drift, 0, 5000);
    assert.equal(drift.pos, start);
    drift.dragStart(300);
    drift.dragMove(200);
    assert.equal(drift.pos, start + 100);
});
