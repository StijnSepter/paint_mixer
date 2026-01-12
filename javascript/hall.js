import { hallStore } from "../store/hall_store.js";
import "../components/mixer.js";

document.getElementById('switch-hall').addEventListener('click', () => {
  const hall1 = document.getElementById('hall-1');
  const hall2 = document.getElementById('hall-2');

  hallStore.switchHall();

  if (hallStore.currentHall === 'hall-1') {
    hall1.style.display = 'block';
    hall2.style.display = 'none';
  } else {
    hall1.style.display = 'none';
    hall2.style.display = 'block';
  }
});

// add mixer to current hall
document.getElementById('add-mixer').addEventListener('click', () => {
  const container = document.getElementById(hallStore.currentHall);
  const hall = hallStore.getCurrentHall();

  if (hall.mixers.length >= 5) {
    alert("Max 5 mixers in this hall");
    return;
  }

  const mixer = document.createElement('paint-mixer');
  container.appendChild(mixer);

  hallStore.addMixerToHall(mixer);
});