document.addEventListener('DOMContentLoaded', () => {
  const historyBody = document.getElementById('historyBody');
  
  chrome.runtime.sendMessage(
    { action: "getHistory" },
    (history) => {
      if (!history || history.length === 0) {
        historyBody.innerHTML = 
          '<tr><td colspan="2" style="text-align:center;">No clipboard history yet</td></tr>';
        return;
      }
      
      historyBody.innerHTML = '';
      history.forEach(item => {
        const row = document.createElement('tr');
        
        const timeCell = document.createElement('td');
        timeCell.textContent = item.time;
        
        const contentCell = document.createElement('td');
        contentCell.className = 'content-cell';
        contentCell.title = item.text; // Show full text on hover
        contentCell.textContent = item.text.length > 100 
          ? item.text.substring(0, 100) + '...' 
          : item.text;
        
        row.appendChild(timeCell);
        row.appendChild(contentCell);
        historyBody.appendChild(row);
      });
    }
  );
});