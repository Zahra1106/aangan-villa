import './style.css';

const stages = [
  { at: 0,    title: 'Welcome home.',          text: 'A flat-roofed villa in glass, stone and timber, lit for the evening. Scroll to walk inside.' },
  { at: 0.17, title: 'Through the front door', text: 'Lit steps lead up to a glass entrance under a timber canopy.' },
  { at: 0.28, title: 'Living lounge',          text: 'A long sectional, a marble media wall and floor-to-ceiling garden views.' },
  { at: 0.5,  title: 'Master bedroom',         text: 'A padded headboard, bedside lamps and warm cove lighting.' },
  { at: 0.68, title: 'Kitchen',                text: 'A marble-topped island with bar stools, a double oven and a steel fridge.' },
  { at: 0.88, title: 'Dining',                 text: 'A long table for eight, with the kitchen and living room open beside it.' },
];

const tour = document.getElementById('tour');
const video = document.getElementById('tourVideo');
const capTitle = document.getElementById('capTitle');
const capText = document.getElementById('capText');
const caption = document.getElementById('caption');
const hint = document.getElementById('hint');
const railItems = [...document.querySelectorAll('#rail li')];
const stage = tour.querySelector('.stage');

let target = 0;
let current = 0;
let stageIndex = -1;

const nav = document.querySelector('.nav');

function readScroll() {
  nav.classList.toggle('solid', tour.getBoundingClientRect().bottom < 80);
  const max = tour.offsetHeight - window.innerHeight;
  target = Math.min(1, Math.max(0, -tour.getBoundingClientRect().top / max));
}

function setStage(p) {
  let i = 0;
  stages.forEach((s, idx) => { if (p >= s.at) i = idx; });
  if (i === stageIndex) return;
  stageIndex = i;
  caption.classList.add('swap');
  setTimeout(() => {
    capTitle.textContent = stages[i].title;
    capText.textContent = stages[i].text;
    caption.classList.remove('swap');
  }, 160);
  // Rail: map the 5 labels to the 5 stages
  railItems.forEach((li, idx) => li.classList.toggle('on', idx === i));
}

function frame() {
  const smooth = matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.14;
  current += (target - current) * smooth;
  if (Math.abs(target - current) < 0.0004) current = target;
  if (video.duration) video.currentTime = current * (video.duration - 0.05);
  stage.style.setProperty('--p', current.toFixed(4));
  hint.classList.toggle('gone', current > 0.03);
  setStage(current);
  requestAnimationFrame(frame);
}

video.pause();
window.addEventListener('scroll', readScroll, { passive: true });
window.addEventListener('resize', readScroll);
readScroll();
requestAnimationFrame(frame);

document.getElementById('visitForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const msg = `Hi, I'm ${f.get('name')}. I'd like to visit Aangan Villa` + (f.get('day') ? ` on ${f.get('day')}` : '') + '.' + (f.get('msg') ? ` ${f.get('msg')}` : '');
  window.open(`https://wa.me/920000000000?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});
