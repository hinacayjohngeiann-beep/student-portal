const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const crumb = document.getElementById('pageCrumb');
const sidebar = document.getElementById('sidebar');
const toast = document.getElementById('toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}
function navigate(pageName) {
  pages.forEach(page => page.classList.toggle('active-page', page.id === pageName));
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.page === pageName));
  const active = document.querySelector(`[data-page="${pageName}"]`);
  crumb.textContent = active ? active.textContent.trim().replace(/\s+\d+$/, '') : pageName;
  sidebar.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
navLinks.forEach(link => link.addEventListener('click', () => navigate(link.dataset.page)));
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.go)));
document.getElementById('sidebarProfile').addEventListener('click', () => navigate('profile'));
document.getElementById('menuToggle').addEventListener('click', () => sidebar.classList.toggle('open'));
document.getElementById('notificationBtn').addEventListener('click', () => {
  navigate('announcements');
  showToast('You are all caught up on campus updates.');
});
document.getElementById('printSchedule').addEventListener('click', () => window.print());
document.getElementById('printGrades').addEventListener('click', () => window.print());

const form = document.getElementById('profileForm');
const editButton = document.getElementById('editProfile');
const formActions = document.getElementById('formActions');
const editableInputs = ['nameInput', 'emailInput', 'phoneInput'].map(id => document.getElementById(id));
let savedValues = [];

function setEditing(editing) {
  editableInputs.forEach(input => input.disabled = !editing);
  formActions.hidden = !editing;
  editButton.hidden = editing;
}
editButton.addEventListener('click', () => {
  savedValues = editableInputs.map(input => input.value);
  setEditing(true);
  editableInputs[0].focus();
});
document.getElementById('cancelEdit').addEventListener('click', () => {
  editableInputs.forEach((input, index) => input.value = savedValues[index]);
  setEditing(false);
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = editableInputs[0].value.trim();
  const email = editableInputs[1].value.trim();
  if (!name || !email || !editableInputs[1].checkValidity()) {
    showToast('Please enter a valid name and email address.');
    return;
  }
  document.getElementById('profileName').textContent = name;
  document.querySelector('.sidebar-user strong').textContent = name;
  // Demo-only persistence in this browser; no information is sent to a server.
  localStorage.setItem('campusly-profile', JSON.stringify({
    name, email, phone: editableInputs[2].value
  }));
  setEditing(false);
  showToast('Profile updated on this device.');
});

const storedProfile = localStorage.getItem('campusly-profile');
if (storedProfile) {
  try {
    const profile = JSON.parse(storedProfile);
    editableInputs[0].value = profile.name || editableInputs[0].value;
    editableInputs[1].value = profile.email || editableInputs[1].value;
    editableInputs[2].value = profile.phone || editableInputs[2].value;
    document.getElementById('profileName').textContent = editableInputs[0].value;
    document.querySelector('.sidebar-user strong').textContent = editableInputs[0].value;
  } catch {
    localStorage.removeItem('campusly-profile');
  }
}

// Keep the dashboard date current on the visitor's device.
const date = new Date();
document.getElementById('todayLabel').textContent = date.toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
}).toUpperCase();
