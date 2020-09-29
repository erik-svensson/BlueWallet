/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as Sentry from '@sentry/react-native';
import TcpSocket from 'react-native-tcp-socket';

import { SocketCallback, SocketOptions } from 'app/consts';

export function connect(config: SocketOptions, callback: SocketCallback) {
  const client = TcpSocket.createConnection(
    {
      port: config.port,
      host: config.host,
      tls: true,
      tlsCheckValidity: config.rejectUnauthorized,
    },
    callback,
  );

  // required functions not supported by react-native-tcp-socket
  // @ts-ignore
  client.setEncoding = () => {};
  // @ts-ignore
  client.setKeepAlive = () => {};
  // @ts-ignore
  client.setNoDelay = () => {};
  return client;
}

export class Socket {
  _socket: any;
  _listeners = {};
  setTimeout = () => {};
  setEncoding = () => {};
  setKeepAlive = () => {};
  setNoDelay = () => {};
  onData = (data: Uint8Array) => {
    Sentry.addBreadcrumb({
      category: 'socket',
      message: `onData lister has not beet setup yet, ${data}`,
      level: Sentry.Severity.Info,
    });
  };
  onError = (error: {}) => {
    Sentry.addBreadcrumb({
      category: 'socket',
      message: `onError lister has not beet setup yet, ${error}`,
      level: Sentry.Severity.Info,
    });
  };
  onConnect = (data: { host: string; port: number }) => {
    Sentry.addBreadcrumb({
      category: 'socket',
      message: `onConnect lister has not beet setup yet, ${data}`,
      level: Sentry.Severity.Info,
    });
  };
  onClose = (data: {}) => {
    Sentry.addBreadcrumb({
      category: 'socket',
      message: `onClose lister has not beet setup yet, ${data}`,
      level: Sentry.Severity.Info,
    });
  };

  connect = (port: number, host: string, callback: SocketCallback) => {
    const _socket = TcpSocket.createConnection(
      {
        port,
        host,
        tls: false,
      },
      callback,
    );

    _socket.on('data', data => {
      this.onData(data);
    });
    _socket.on('error', error => {
      this.onError(error);
    });
    _socket.on('close', data => {
      this.onClose(data);
    });
    _socket.on('connect', data => {
      this.onConnect(data);
    });
    this._socket = _socket;
  };

  on = (event: string, listener: (data: {}) => void) => {
    switch (event) {
      case 'data':
        this.onData = listener;
        break;
      case 'error':
        this.onError = listener;
        break;
      case 'connect':
        this.onConnect = listener;
        break;
      case 'close':
        this.onClose = listener;
        break;
      default:
        return;
    }
  };

  removeListener = (event: string) => {
    switch (event) {
      case 'data':
        this.onData = () => {};
        break;
      case 'error':
        this.onError = () => {};
        break;
      case 'connect':
        this.onConnect = () => {};
        break;
      case 'close':
        this.onClose = () => {};
        break;
      default:
        return;
    }
  };

  end = () => {
    this._socket.end();
  };

  destroy = () => {
    this._socket.destroy();
  };

  write = (data: {}) => {
    this._socket.write(data);
  };
}
