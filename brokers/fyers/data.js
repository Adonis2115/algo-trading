const express = require("express");
const router = express.Router();
const fyers = require("fyers-api-v2");
const Credentials = require("../../../backtrader/brokers/fyers/credentials.json");
const pool = require("../../db");

fyers.setAppId(Credentials.appID);
fyers.setRedirectUrl(Credentials.url);
fyers.setAccessToken(Credentials.token);

async function getHistory(data) {
  let history = new fyers.history();
  let result = await history
    .setSymbol(data[0])
    .setResolution(data[1])
    .setDateFormat(1)
    .setRangeFrom(data[2])
    .setRangeTo(data[3])
    .getHistory();
  return result;
}

async function getQuotes(script) {
  let quotes = new fyers.quotes();
  let result = await quotes.setSymbol(script).getQuotes();
  return result;
}

async function marketDepth(script) {
  let marketDepth1 = new fyers.marketDepth();
  let result = await marketDepth1
    .setSymbol(script)
    .setOhlcvFlag(1)
    .getMarketDepth();
  return result;
}

// Return Data Stream instead of console and process it
function subscribe(script) {
  const reqBody = {
    symbol: script,
    dataType: "symbolUpdate",
  };
  fyers.fyers_connect(reqBody, function (data) {
    console.log(data);
  });
}

function unsubscribe(scripts) {
  const reqBody = {
    symbol: scripts,
    dataType: "symbolUpdate",
  };
  fyers.fyers_unsuscribe(reqBody);
}

router.post("/historical", (req, res) => {
  getHistory(req.body.data).then((response) => {
    res.status(200).send(response);
  });
});

function toLocalTime(timeStamp) {
  let dateObj = new Date(timeStamp * 1000);
  let utcString = dateObj.toUTCString();
  let localTime = new Date(utcString).toLocaleString();
  return localTime;
}

router.post("/save", (req, res) => {
  getHistory(req.body.data).then((response) => {
    try {
      //   let lastRecord = await pool.query(`SELECT id, date, open, high, low, close FROM nifty_50 WHERE id=(select max(id) from nifty_50)`);
      //   let lastTime = lastRecord.rows[0].date
      //   console.log(lastTime)
      //   if(lastTime == toLocalTime(response.candles.pop()[0])){
      //       console.log("No new data");
      //   }
      // save to database async

      const newCandle = response.candles.map(async (element) => {
        await pool.query(
          `INSERT INTO nifty_50 (date, open, high, low, close) VALUES ('${element[0]}', '${element[1]}', '${element[2]}', '${element[3]}', '${element[4]}')`
        );
      });
      res.status(200).send("Success");
    } catch (err) {
      res.status(500).send(err);
    }
  });
});

router.post("/quotes", (req, res) => {
  getQuotes(req.body.script).then((response) => {
    res.status(200).send(response);
  });
});

router.post("/marketdepth", (req, res) => {
  marketDepth(req.body.script).then((response) => {
    res.status(200).send(response);
  });
});

router.post("/subscribe", (req, res) => {
  subscribe(req.body.script);
  res.status(200).send(`Subscribed to ${req.body.script}`);
});

router.post("/unsubscribe", (req, res) => {
  unsubscribe(req.body.script);
  res.status(200).send(`Unsubscribed to ${req.body.script}`);
});

module.exports = router;
