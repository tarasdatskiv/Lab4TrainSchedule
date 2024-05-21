const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
// Підключення до бази даних
const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "trainschedule",
    password: "",
    port: "3306"
});

conn.connect(err => {
    if (err) {
        console.log(err);
        return err;
    } else {
        console.log('Database -------- OK');
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//1. Вивести список поїздів, які прямують з станції до станції.
app.get('/schedule/reporstation', (req, res) => {
  const nameStation = 'Львів';

  const query = `
    SELECT 
      s.nameTrain,
      s.nameStation,
      s.stop_count,
      s.duration,
      s.stationDestination,
      s.train_number,
      s.date
    FROM schedule s
    WHERE s.nameStation = ?
  `;

  conn.query(query, [nameStation], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const trainsFromLviv = results.filter(row => row.nameStation === 'Львів');

    console.log('Trains from Lviv station:', trainsFromLviv);
    res.json(trainsFromLviv);
  });
});
  
// 2. Запит на тривалість рейсу
app.get('/schedule/duration/time', (req, res) => {
  const query = `
    (
      SELECT
        s.nameTrain,
        s.nameStation,
        s.stationDestination,
        s.stop_count,
        s.date,
        s.train_number,
        s.duration
      FROM schedule s
      ORDER BY s.duration DESC
      LIMIT 1
    )
    UNION
    (
      SELECT
        s.nameTrain,
        s.nameStation,
        s.stationDestination,
        s.stop_count,
        s.date,
        s.train_number,
        s.duration
      FROM schedule s
      ORDER BY s.duration ASC
      LIMIT 1
    )
  `;

  conn.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('Trains with max and min duration:', results);
    res.json(results);
  });
});

//3.Написати запит, який виводить поїзд, у якого найбільше зупинок.
app.get('/schedule/max-stops', (req, res) => {
  const query = `
    SELECT
      s.nameTrain,
      s.nameStation,
      s.stationDestination,
      s.duration,
      s.date,
      s.train_number,
      s.stop_count
    FROM schedule s
    ORDER BY s.stop_count DESC
    LIMIT 5
  `;

  conn.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('Top 5 trains with max stops:', results);
    res.json(results);
  });
});

//4.Вивести звіт про те, скільки рейсів є до кожної станції.
app.get('/schedule/report', (req, res) => {
  const stationDestination = 'Київ'; // Змініть на потрібну станцію призначення

  const query = `
    SELECT
      s.nameStation,
      s.stationDestination,
      s.nameTrain,
      s.stop_count,
      s.train_number,
      s.date,
      s.duration,
      COUNT(*) AS total_trips
    FROM schedule s
    WHERE s.stationDestination = ?
    GROUP BY s.nameStation, s.nameTrain, s.stop_count, s.train_number, s.date, s.duration
    ORDER BY total_trips DESC
  `;

  conn.query(query, [stationDestination], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log(`Report of trips to ${stationDestination}:`, results);
    res.json(results);
  });
});

//5.Знайти станції, назви яких закінчуються на «».
app.get('/schedule/search-stations', (req, res) => {
  const searchTerm = req.query.term || ''; // Получить значение searchTerm из параметра запроса

  const query = `
    SELECT
      s.nameTrain,
      s.stationDestination,
      s.stop_count,
      s.train_number,
      s.duration,
      s.date,
      s.nameStation
    FROM schedule s
    WHERE s.nameStation LIKE ?
  `;

  const searchPattern = `%${searchTerm}%`; // Создать шаблон для поиска с помощью LIKE

  conn.query(query, [searchPattern], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log(`Stations matching "${searchTerm}":`, results);
    res.json(results);
  });
});


//6.Вивести список поїздів, які вирушають сьогодні, Сьогоднішню дату запит повинен "дізнатися самостійно" і виділити з неї число та місяць, використовуючи функції роботи з датами.
app.get('/schedule/today', (req, res) => {
    const query = 'SELECT * FROM schedule WHERE DATE(date) = CURDATE()';
    conn.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Trains departing today:', results); // Виведення в консоль
        res.json(results); // Відправка простої відповіді клієнту
    });
});
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });

