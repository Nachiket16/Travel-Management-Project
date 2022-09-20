const express = require("express");
const db = require("../db");
const utils = require("../utils")
const router = express.Router();

router.post("/searchbus", (request, response) => {
  const { Departure_date, From_location, To_location } = request.body;

  const query = ` 
  SELECT Journey_id, Bus_name, Bus_type, Seat_type, Bus_rating, 
    DATE_FORMAT(Departure_datetime, "%H:%i") AS Departure_time,  
    DATE_FORMAT(TIMEDIFF(Arrival_datetime,Departure_datetime),"%H:%i") AS Duration, 
    DATE_FORMAT(Arrival_datetime, "%H:%i") AS Arrival_time, 
    Fare, Available_seats  
  FROM Journey_details j 
  INNER JOIN Bus b ON j.Bus_id = b.Bus_id 
  WHERE DATE(Departure_datetime) = ? 
  AND From_location = ? 
  AND To_location = ? ;
        `;
  db.pool.query(
    query,
    [Departure_date, From_location, To_location],
    (error, result) => {
      if (error) {
        response.send(error);
      } else {
        response.send(result);
      }
    }
  );
});

// ----  View admin Bus ---

router.get("/admin/viewJourney", (request, response) => {
  const query = `
  SELECT * from journey_details;
  `
  db.pool.query(query, (error, result) => {
    response.send(utils.createResult(error, result))
  });
});

router.get("/admin/viewBus", (request, response) => {
  const query = `
  SELECT * from Bus;
  `
  db.pool.query(query, (error, result) => {
    response.send(utils.createResult(error, result))
  });
});

module.exports = router;
