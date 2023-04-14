import TcpSocket from 'react-native-tcp-socket';

import { SocketCallback, SocketOptions } from 'app/consts';

export function connect(config: SocketOptions, callback: SocketCallback) {
  const client = TcpSocket.connectTLS(
    {
      port: config.port,
      host: config.host,
      tlsCheckValidity: config.rejectUnauthorized,
    },
    callback,
  );

  return client;
}
