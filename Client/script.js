
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const stationsTable = document.getElementById('TableTrainListid');

// const cors = require('cors');
// app.use(cors()); // Enable CORS for all routes
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     next();
//   });

let buttonTrainToday = document.getElementById("buttonTrainTodayid");
let buttonReporstation = document.getElementById("buttonReporstationid");
let buttonReport = document.getElementById("buttonReportid");
let buttonmaxstops = document.getElementById("buttonmaxstopsid");
let buttontime = document.getElementById("buttontimeid");
//1.
buttonReporstation.addEventListener("click", function()  {
fetch('http://localhost:3000/schedule/reporstation')
  .then(response => response.json())
  .then(data => {
    // Оновлення вмісту сторінки з отриманими даними
    const tableBody = document.querySelector('#TableTrainListid tbody');
    tableBody.innerHTML = ''; // Очищення існуючих рядків таблиці

    data.forEach(train => {
      const row = document.createElement('tr');
      row.innerHTML = `
 
        <tr>
        <td>${train.nameStation}</td>
        <td>${train.stationDestination}</td>
        <td>${train.nameTrain}</td>
        <td>${train.train_number}</td>
        <td>${train.date}</td>
        <td>${train.stop_count}</td>
        <td>${train.duration}</td>
        </tr>

      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error('Error:', error));

});
//2.
buttontime.addEventListener("click", function()  {
  fetch('http://localhost:3000/schedule/duration/time')
    .then(response => response.json())
    .then(data => {
      // Оновлення вмісту сторінки з отриманими даними
      const tableBody = document.querySelector('#TableTrainListid tbody');
      tableBody.innerHTML = ''; // Очищення існуючих рядків таблиці
  
      data.forEach(train => {
        const row = document.createElement('tr');
        row.innerHTML = `
   
          <tr>
          <td>${train.nameStation}</td>
          <td>${train.stationDestination}</td>
          <td>${train.nameTrain}</td>
          <td>${train.train_number}</td>
          <td>${train.date}</td>
          <td>${train.stop_count}</td>
          <td>${train.duration}</td>
          </tr>
  
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error:', error));
  
  });
//3.
buttonmaxstops.addEventListener("click", function()  {
  fetch('http://localhost:3000/schedule/max-stops')
    .then(response => response.json())
    .then(data => {
      // Оновлення вмісту сторінки з отриманими даними
      const tableBody = document.querySelector('#TableTrainListid tbody');
      tableBody.innerHTML = ''; // Очищення існуючих рядків таблиці
  
      data.forEach(train => {
        const row = document.createElement('tr');
        row.innerHTML = `
   
          <tr>
          <td>${train.nameStation}</td>
          <td>${train.stationDestination}</td>
          <td>${train.nameTrain}</td>
          <td>${train.train_number}</td>
          <td>${train.date}</td>
          <td>${train.stop_count}</td>
          <td>${train.duration}</td>
          </tr>
  
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error:', error));
  
  });
//4.
buttonReport.addEventListener("click", function()  {
  fetch('http://localhost:3000/schedule/report')
    .then(response => response.json())
    .then(data => {
      // Оновлення вмісту сторінки з отриманими даними
      const tableBody = document.querySelector('#TableTrainListid tbody');
      tableBody.innerHTML = ''; // Очищення існуючих рядків таблиці
  
      data.forEach(train => {
        const row = document.createElement('tr');
        row.innerHTML = `
   
          <tr>
          <td>${train.nameStation}</td>
          <td>${train.stationDestination}</td>
          <td>${train.nameTrain}</td>
          <td>${train.train_number}</td>
          <td>${train.date}</td>
          <td>${train.stop_count}</td>
          <td>${train.duration}</td>
          </tr>
  
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error:', error));
  
  });
//6.
buttonTrainToday.addEventListener("click", function()  {
  fetch('http://localhost:3000/schedule/today')
    .then(response => response.json())
    .then(data => {
      // Оновлення вмісту сторінки з отриманими даними
      const tableBody = document.querySelector('#TableTrainListid tbody');
      tableBody.innerHTML = ''; // Очищення існуючих рядків таблиці
  
      data.forEach(train => {
        const row = document.createElement('tr');
        row.innerHTML = `
   
          <tr>
          <td>${train.nameStation}</td>
          <td>${train.stationDestination}</td>
          <td>${train.nameTrain}</td>
          <td>${train.train_number}</td>
          <td>${train.date}</td>
          <td>${train.stop_count}</td>
          <td>${train.duration}</td>
          </tr>
  
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error:', error));
  
  });

//5.
  function searchStations() {
    const searchTerm = searchInput.value.trim();
  
    if (searchTerm) {
      fetch(`http://localhost:3000/schedule/search-stations?term=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
          const tableBody = stationsTable.querySelector('tbody');
          tableBody.innerHTML = '';
  
          data.forEach(station => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${station.nameStation}</td>
              <td>${station.stationDestination}</td>
              <td>${station.nameTrain}</td>
              <td>${station.train_number}</td>
              <td>${station.date}</td>
              <td>${station.stop_count}</td>
              <td>${station.duration}</td>
            `;
            tableBody.appendChild(row);
          });
        })
        .catch(error => console.error('Error:', error));
    } else {
      const tableBody = stationsTable.querySelector('tbody');
      tableBody.innerHTML = '';
    }
  }

  searchButton.addEventListener('click', searchStations);
  searchInput.addEventListener('input', searchStations); // Search on input change
























// function updateTable(data, columnsToDisplay) {
//   const tableBody = document.querySelector('#TableTrainListid tbody');
//   tableBody.innerHTML = '';

//   const tableHeader = document.querySelector('#TableTrainListid thead tr');
//   tableHeader.innerHTML = '';

//   const columnNames = [
//     { name: 'Station', label: 'Станція відправлення' },
//     { name: 'TrainNumber', label: 'Номер потягу' },
//     { name: 'DataAndTime', label: 'Дата & час' },
//     { name: 'StationDestination', label: 'Станція прибуття' },
//     { name: 'TrainName', label: 'Назва потягу' },
//     { name: 'StopCout', label: 'Кількість зупинок' },
//     { name: 'Duration', label: 'Час в шляху' }
//   ];

//   // Create column headers based on the provided columnsToDisplay array
//   columnsToDisplay.forEach(columnIndex => {
//     const { name, label } = columnNames[columnIndex];
//     const th = document.createElement('th');
//     th.textContent = `${name} ${label}`;
//     tableHeader.appendChild(th);
//   });

//   data.forEach(train => {
    
//     const row = document.createElement('tr');
    
   
//             row.innerHTML = `
       
      
//               <tr>
//               <td>${train.nameStation}</td>
//               <td>${train.stationDestination}</td>
//               <td>${train.nameTrain}</td>
//               <td>${train.train_number}</td>
//               <td>${train.date}</td>
//               <td>${train.stop_count}</td>
              
//               </tr>
      
//             `;
//             tableBody.appendChild(row);
//     columnsToDisplay.forEach(columnIndex => {
//       const { name } = columnNames[columnIndex];
//       const td = document.createElement('td');
//       const value = train[name] !== undefined ? train[name] : '';
//       td.textContent = value;
//       row.appendChild(td);
//     });
//     tableBody.appendChild(row);
//   });
// }

// buttonReporstation.addEventListener("click", function() {
//   fetch('http://localhost:3000/schedule/reporstation')
//     .then(response => response.json())
//     .then(data => {
//       const columnsToDisplay = [3, 1, 2]; // Indices of columns to display
//       updateTable(data, columnsToDisplay);
//     })
//     .catch(error => console.error('Error:', error));
// });

// buttonTrainToday.addEventListener("click", function() {
//   fetch('http://localhost:3000/schedule/today')
//     .then(response => response.json())
//     .then(data => {
//       const columnsToDisplay = [0, 3, 4, 1 , 2, 6]; // Indices of columns to display
//       updateTable(data, columnsToDisplay);
//     })
//     .catch(error => console.error('Error:', error));
// });