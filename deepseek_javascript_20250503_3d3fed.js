document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ action: "getHistory" }, (history) => {
    const tbody = document.getElementById('historyBody');
    tbody.innerHTML = '';
    
    history.forEach(item => {
      const row = document.createElement('tr');
      
      const timeCell = document.createElement('td');
      timeCell.textContent = item.time;
      
      const textCell = document.createElement('td');
      textCell.textContent = item.text.length > 100 
        ? item.text.substring(0, 100) + '...' 
        : item.text;
      
      row.appendChild(timeCell);
      row.appendChild(textCell);
      tbody.appendChild(row);
    });
  });
});