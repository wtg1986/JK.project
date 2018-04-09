// var todo = require('./Models/todo');
  
module.exports = {
  configure: function(app) {
    app.get('/todo/', function(req, res) {
      console.log('GET')
      // todo.get(res);
    });
     
    app.get('/todo/read/:id/', function(req, res) {
      console.log('READ')
      // todo.read(res);
    });
 
    app.post('/push', function(req, res) {
      console.log(req.body)
      console.log('ssss')
      // todo.create(req.body, res);
    });
  
    app.put('/todo/update', function(req, res) {
      console.log('UPDATE')
      // todo.update(req.body, res);
    });
  
    app.delete('/todo/delete/:id/', function(req, res) {
      console.log('DELETE')
      // todo.delete(req.params.id, res);
    });
  }
};