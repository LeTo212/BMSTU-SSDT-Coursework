const express = require("express");
const fs = require("fs");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

const DEFAULT_PATH = "/Users/dominyk/Desktop/Database";

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Dom12345",
  database: "Coursework",
});

connection.connect(function (error) {
  if (error) console.log(error);
  else console.log("Connected");
});

const server = app.listen(5555, function () {
  //const host = server.address().address;
  const port = server.address().port;
  console.log("Listening on port " + port);
});

app.get("/movies", function (req, res) {
  connection.query(
    "SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));"
  );
  connection.query(
    "select m.MovieID, m.Title, t.Name as 'Type', group_concat(distinct g.Name separator ', ') as 'Genres', \
      group_concat(distinct Concat(d.Name,' ', Ifnull(d.MiddleName,' '), d.Surname) separator ', ') as 'Directors', \
      m.Rating, m.Description, m.ReleaseDate \
    from Movie m, Type t, Director_Movie d_m, Director d, Genre_Movie g_m, Genre g \
    where m.TypeID = t.TypeID and d.DirectorID = d_m.DirectorID \
      and m.MovieID = d_m.MovieID and g.GenreID = g_m.GenreID and m.MovieID = g_m.MovieID \
    group by m.MovieID;",
    function (error, rows, fields) {
      if (error) console.log(error);
      else {
        rows.forEach(function (part, index, arr) {
          arr[index].Genres = arr[index].Genres.split(", ");
          arr[index].Directors = arr[index].Directors.split(", ");
        });
        //console.log(rows);
        res.status(200).json(rows);
      }
    }
  );
});

app.get("/video", function (req, res) {
  const MovieID = req.query.MovieID;
  if (MovieID) {
    const Season = req.query.Season
      ? " and v.Season = " + req.query.Season
      : "";
    const Episode = req.query.Episode
      ? " and v.Episode = " + req.query.Episode
      : "";

    const sql = `select v.Path from Video v where v.MovieID = ${
      MovieID + Season + Episode
    };`;

    connection.query(sql, function (error, rows, fields) {
      if (error) console.log(error);
      else {
        if (rows[0] != null) {
          const path = DEFAULT_PATH + rows[0].Path;

          if (fs.existsSync(path)) {
            const stat = fs.statSync(path);
            const fileSize = stat.size;
            const range = req.headers.range;

            if (range) {
              const parts = range.replace(/bytes=/, "").split("-");
              const start = parseInt(parts[0], 10);
              const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

              if (start >= fileSize) {
                res
                  .status(416)
                  .send(
                    "Requested range not satisfiable\n" +
                      start +
                      " >= " +
                      fileSize
                  );
                return;
              }

              const chunksize = end - start + 1;
              const file = fs.createReadStream(path, { start, end });
              const head = {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": "video/mp4",
              };

              res.writeHead(206, head);
              file.pipe(res);
            } else {
              const head = {
                "Content-Length": fileSize,
                "Content-Type": "video/mp4",
              };
              res.writeHead(200, head);
              fs.createReadStream(path).pipe(res);
            }
          } else res.status(500).send("Can't find video");
        } else res.status(400).send("Invalid ID");
      }
    });
  } else res.status(500).send("Enter movie ID");
});

app.get("/image", function (req, res) {
  const MovieID = req.query.MovieID;
  const Type = req.query.Type;

  if (new Set(["Poster", "Backdrop"]).has(Type)) {
    connection.query(
      `select ${Type} from Movie where MovieID = ${MovieID}`,
      function (error, rows, fields) {
        if (error) console.log(error);
        else {
          if (rows[0] != null) {
            const picPath = DEFAULT_PATH + rows[0][Type];

            if (fs.existsSync(picPath)) {
              const head = {
                "Content-Type": "image/jpeg",
              };
              res.writeHead(200, head);
              fs.createReadStream(picPath).pipe(res);
            } else res.status(500).send("Can't find image");
          } else res.status(400).send("Invalid ID");
        }
      }
    );
  } else res.status(400).send("Invalid Type");
});
