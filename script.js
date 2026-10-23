// Progressive enhancement: every project remains visible without JavaScript.
const filters = document.querySelector('.filters');
const projects = [...document.querySelectorAll('.project-row')];
const count = document.querySelector('.result-count');

if (filters && count) {
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    const category = button.dataset.filter;
    filters.querySelectorAll('button').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    projects.forEach((project) => {
      project.hidden = category !== 'all' && project.dataset.category !== category;
    });
    const visible = projects.filter((project) => !project.hidden).length;
    count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
  });
}
