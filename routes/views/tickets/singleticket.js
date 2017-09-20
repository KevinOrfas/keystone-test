const keystone = require('keystone');
exports = module.exports = (req, res) => {
  const view = new keystone.View(req, res);
  const locals = res.locals;
  // locals. section is used to set the currently selected item in the header navigation
  locals.section = 'tickets';
  locals.data = {
    ticket: {}
  };

  // Load all tickets
  view.on('init', (next) => {
    const q = keystone.list('Ticket').model.findOne({ slug: req.params.ticketslug });

    q.exec((err, results) => {
      if (results !== null) {
        locals.data.ticket = results;
      } else {
        return res.status(404).send(keystone.wrapHTMLError('Sorry, no ticket found! (404)'));
      }
      next(err);
    });
  });
  view.render('tickets/singleticket');
};