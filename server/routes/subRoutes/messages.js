const Message = require('../../controller/messages.js');

module.expports = app => {
  app.post('/api/messages/newmessage', Message.postMessage);

  app.get('/api/messages/:senderType/:userid/:receiverType/:rid', Message.getAllMessages);
  app.get('/api/messages/:physid/:patid', Message.getAllMessages_phy_from_pat);
  app.get('/api/messages/patient/:patid/:physid', Message.getAllMessages_pat_from_phy);

  app.get('/api/messages/getOne', Message.getOneMessage);
  app.put('/api/messages/edit', Message.editOneMessage);
  app.delete('/api/messages/delete', Message.deleteOneMessage);

}
