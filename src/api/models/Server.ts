import cors from 'cors';
import { Server as HTTPServer } from 'http';
import express, { Application, json, Router } from 'express';

import { registerRoutes } from '../routes';
import { errorHandler, routeHandler } from '../middlewares';
import appConfig from '../../shared/infrastructure/config';

export class Server {
  private app: Application;
  private port: number;
  private httpServer?: HTTPServer;

  constructor() {
    this.port = appConfig.get('port');
    this.app = express();
    this.httpServer = new HTTPServer(this.app);
  }

  middlewares() {
    this.app.use(cors({origin: '*'}));
    this.app.use(json());
    const router = Router();
    this.app.use(router);
    registerRoutes(router);
    this.app.use(errorHandler);
    this.app.use(routeHandler);
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.middlewares();
      this.httpServer?.listen(this.port, () => {
        console.log(`Server running on: http://localhost:${this.port}`);
      })
      console.log('  Press CTRL-C to stop\n');
      resolve();
    })
  }

  get HTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }
      return resolve();
    })
  }
}