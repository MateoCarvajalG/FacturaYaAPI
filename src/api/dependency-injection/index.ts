import { ContainerBuilder } from 'node-dependency-injection';


import { UserCreator } from '../../users/application/UserCreator';
import { MongoUserRepository } from '../../users/infraestructure/MongoUserRepository';
import { CreatorUserController } from '../controllers/users/CreateUserController';


const container = new ContainerBuilder();
container
  .register('users.domain.UserRepository',MongoUserRepository)

container
  .register('users.application.UserCreator',UserCreator)
  .addArgument(container.get('users.domain.UserRepository'))

container
  .register('api.controller.CreateUsersController',CreatorUserController)
  .addArgument(container.get('users.application.UserCreator'))


export default container;


