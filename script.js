document.addEventListener('DOMContentLoaded', () => {
 
    const datePicker = document.getElementById('date-picker');
    const dailyText = document.getElementById('daily-text');
    const saveStatus = document.getElementById('save-status');
    const downloadBtn = document.getElementById('download-btn');
  
   
    let dailyLogs = JSON.parse(localStorage.getItem('dailyLogs')) || {};

    // dailyLogs = "";
  
    const today = new Date();
    const offsetDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    const todayKey = offsetDate.toISOString().slice(0, 10);
    datePicker.value = todayKey;

  
    let dateKey = datePicker.value; 
  
    function loadDay(dKey) {
      dailyText.value = dailyLogs[dKey] || '';
    }
    console.log(today);
    loadDay(dateKey);

    const currMonth = today.getMonth();
    const currYear = today.getFullYear();
    // console.log(currYear);
    downloadBtn.textContent = 'Download ' + currYear + ' Entries';
    // console.log(currMonth);
    if (currMonth === 11){
        downloadBtn.style.display = 'inline-block';
    } else{
        downloadBtn.style.display = 'none';
    }
    
    function autoResize() {
        this.style.height = 'auto';             
        this.style.height = this.scrollHeight + 'px';
      }

      dailyText.addEventListener('input', autoResize);
  
      autoResize.call(dailyText);

    dailyText.addEventListener('input', () =>{
        dailyLogs[dateKey] = dailyText.value;
        localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
        
    });
    datePicker.addEventListener('change', () => {
      dailyLogs[dateKey] = dailyText.value;
      localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
      
      dateKey = datePicker.value;
      loadDay(dateKey);
      autoResize.call(dailyText);
    });


    downloadBtn.addEventListener('click', () => {
        console.log(dailyLogs);
        let fileContent = "";
  
        const sortedKeys = Object.keys(dailyLogs).sort();
  
        for (const key of sortedKeys) {
          fileContent += `Date: ${key}\n${dailyLogs[key]}\n\n`;
        }
  
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'daily_logs.txt';
        link.click();
        URL.revokeObjectURL(link.href);
      });
      
  });
  