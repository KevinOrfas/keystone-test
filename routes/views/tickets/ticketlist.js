const keystone = require('keystone');
exports = module.exports = (req, res) => {
  const view = new keystone.View(req, res);
  const locals = res.locals;
  // locals. section is used to set the currently selected item in the header navigation
  locals.section = 'tickets';
  locals.data = {
    tickets: []
  };

  // Load all tickets
  view.on('init', (next) => {
    const q = keystone.list('Ticket').model.find();
    // const q = keystone.list('Ticket').paginate({
    //   page: req.query.page || 1,
    //   perPage: 5,
    //   maxPages: 5
    // });
    q.exec((err, results) => {
      locals.data.tickets = results;
      next(err);
    });
  });
  view.render('tickets/ticketlist');
};