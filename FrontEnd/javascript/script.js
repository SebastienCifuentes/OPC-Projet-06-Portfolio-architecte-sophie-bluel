const token = localStorage.getItem('token');

if (token) {
  document.querySelector('.blackBarAdmin').classList.remove('hidden');
  document.querySelector('.filters').classList.add('hidden');
  const loginBtn = document.querySelector('.loginLogout');
  loginBtn.innerHTML = 'logout';
  loginBtn.href = '#';
  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.localStorage.removeItem('token');
    window.location = "index.html";
  })
}
