import '../components/header.js';
import '../components/sidebar.js'
import '../components/bucket.js';
import '../components/add_button.js'

document.addEventListener('add-pot', () => {
  console.log('Add new paint pot');
});

document.addEventListener('add-pot', () => {
  const container = document.getElementById('pot-container');
  container.insertAdjacentHTML('beforeend', '<paint-pot></paint-pot>');
});