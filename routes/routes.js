'use strict';


module.exports = function (app) {
  
  const controllerEngineers = require ('./../controller/controllerEngineers');
  const controllerCompanies = require ('./../controller/controllerCompanies');
//  const controllerSearchEngineers = require ('./controller/controllerSearchEngineers');
//  const controllerShortEngineers = require ('./controller/controllerShortEngineers');
//  const controllerPagenationEngineers = require ('./controller/controllerPagenationEngineers');
  const controllerGlobal = require ('./../controller/controllerGlobal');
  const controllerLogin = require ('./../controller/controllerLogin');


  //Routing engineers
  //All Jobs
  app.route ('/engineers/users').get(controllerEngineers.users);
  app.route ('/engineers/user/:id').get (controllerEngineers.user);
  //POST
  app.route ('/engineers/user').post (controllerEngineers.add);
  //PATCH
  app.route ('/engineers/user/:id').patch (controllerEngineers.update);
  //DELETE
  app.route ('/engineers/user/:id').delete (controllerEngineers.destroy);


  //login Auth
  app.route ('/login').post (controllerLogin.add);
  app.route ('/secret').get (controllerLogin.secret);


  //Router Companies
  //app.route ('/companies').get (controllerCompanies.welcome);
  app.route ('/companies/users').get (controllerCompanies.users);
  
  //app.route ('/companies/user/:id').get (controllerCompanies.user);
  
  //POST
  app.route ('/companies/user').post (controllerCompanies.add);
  
  //PATCH
  app.route ('/companies/user/:id').patch (controllerCompanies.update);

  //DELETE
  app.route ('/companies/user/:id').delete (controllerCompanies.destroy);


  //Router Global
  //app.route ('/global').get (controllerGlobal.welcome);
  app.route ('/global/:user/:page').get (controllerGlobal.users);
  
  //app.route ('/global/user/:id').get (controllerGlobal.user);
  
  //POST
  app.route ('/chat').post (controllerGlobal.add);
  
  //PATCH
  //app.route ('/global/user/:id').patch (controllerGlobal.update);

  //DELETE
  //app.route ('/global/user/:id').delete (controllerGlobal.destroy);
 

};

