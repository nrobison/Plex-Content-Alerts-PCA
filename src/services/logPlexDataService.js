const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, prettyPrint } = format;


const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(), //UTC timestamp
    format((info) => {
      //Local timestamp for easier viewing
      info.timestamp_local = new Date().toLocaleString('en-US', {
        dateStyle: 'long',
        timeStyle: 'medium'
      });
      return info;
    })(),
    //json() //Stores logs as JSON with timestamp and message
    prettyPrint() //Stores logs as human-readable text with timestamp and message
  ),
  transports: [
    new transports.File({ filename: 'logs/plexWebhook.log' })
  ]
});

module.exports = logger;
