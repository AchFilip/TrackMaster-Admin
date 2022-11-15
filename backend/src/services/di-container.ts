import "reflect-metadata";
import { Container } from 'inversify';
import { SocketsService } from './sockets';

const DIContainer = new Container();


// Register sockets service
DIContainer
  .bind<SocketsService>(SocketsService)
  .toConstantValue(new SocketsService());

export { DIContainer };
