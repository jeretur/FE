import { fetchData } from '/fetch.js';

const loadHistory = async () => {
  const token = localStorage.getItem('token');
  const opts = { headers: { Authorization: `Bearer ${token}` } };

  // grab both lists at once
  const [entries, exercises] = await Promise.all([
    fetchData('http://localhost:3000/api/entries', opts),
    fetchData('http://localhost:3000/api/entries/stats', opts)
  ]);

  const container = document.getElementById('historyRows');
  container.innerHTML = '';

  if (entries.error || exercises.error) {
    container.textContent = 'Error loading history';
    return;
  }

  const count = Math.max(entries.length, exercises.length);
  for (let i = 0; i < count; i++) {
    const e = entries[i] || {};
    const ex = exercises[i] || {};

    const row = document.createElement('div');
    row.className = 'history-row';
    row.innerHTML = `
      <div class="history-col diary">
        ${e.entry_date ? `<p><strong>Date:</strong> ${e.entry_date}</p>` : ''}
        ${e.mood ? `<p><strong>Mood:</strong> ${e.mood}</p>` : ''}
        ${e.weight ? `<p><strong>Weight:</strong> ${e.weight} kg</p>` : ''}
        ${e.sleep_hours ? `<p><strong>Sleep:</strong> ${e.sleep_hours} h</p>` : ''}
        ${e.notes ? `<p><strong>Notes:</strong> ${e.notes}</p>` : ''}
      </div>
      <div class="history-col exercise">
        ${ex.type ? `<p><strong>Type:</strong> ${ex.type}</p>` : ''}
        ${ex.duration ? `<p><strong>Duration:</strong> ${ex.duration} min</p>` : ''}
        ${ex.intensity ? `<p><strong>Intensity:</strong> ${ex.intensity}/10</p>` : ''}
      </div>
    `;
    container.appendChild(row);
  }
};

window.onload = loadHistory;
window.addEventListener('exerciseAdded', loadHistory);