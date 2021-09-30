import axios, { Method } from 'axios';
import express from 'express';

import mocks from '../data';
import Store from './store';

// TODO get api URL based on env
const API_BASE_URL = 'https://email-notifications-v2.testnet.btcv.stage.rnd.land/api';

export default (store: Store, callback: () => void) => {
  const app = express();

  app.put('/mock', (req, res) => {
    const preset = req.query.preset as string;

    const mock = mocks[preset];

    if (mock) {
      store.clear();
      store.usePreset(mock);
      res.status(201).send('OK');
    } else if (preset && !mock) {
      res.status(404).send('Not Found ' + preset);
    } else {
      res.status(400).send('Bad Request');
    }
  });

  app.delete('/mock', (req, res) => {
    store.clear();
    res.status(200).send('Deleted');
  });

  app.use((req, res, next) => {
    const method = req.method as Method;
    const path = req.path;

    console.log('request received' + req.path);

    if (store.hasMock(method, path)) {
      const mock = store.get(method, path);

      console.log('sending mock response');
      res.status(mock.status).send(mock.body);
      return;
    } else {
      next();
    }
  });

  app.use((req, res) => {
    axios
      .request({
        method: req.method as Method,
        url: `${API_BASE_URL}${req.path}`,
        data: req.body,
        validateStatus: (status: number) => status < 500,
      })
      .then(response => {
        console.log('resending axios response');
        res.status(response.status).json(response.data);
      });
  });

  app.all('*');

  return app.listen(3001, callback);
};
