const darkModeBtn = document.querySelector('.header-darkmode-btn');

// Funkcja do włączania/wyłączania trybu ciemnego
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  // Zapisz stan w localStorage
  const isDarkMode = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDarkMode);
}

// Sprawdź, czy tryb ciemny był wcześniej włączony
function checkDarkMode() {
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'true') {
    document.body.classList.add('dark');
  }
}

// Dodaj nasłuchiwanie na kliknięcia przycisku
darkModeBtn.addEventListener('click', toggleDarkMode);

// Sprawdź stan trybu ciemnego podczas ładowania strony
checkDarkMode();