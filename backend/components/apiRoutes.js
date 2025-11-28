const bot = require('./bot');

function registerApiRoutes(app, io) {
  app.post('/api/reply', (req, res) => {
    const text = (req.body && req.body.text) || '';
    const info = bot.scheduleBotResponse(io, text);
    return res.json({ status: 'ok', scheduled: true, ...info });
  });
}

module.exports = { registerApiRoutes };
