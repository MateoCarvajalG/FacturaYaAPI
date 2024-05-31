import { ContainerBuilder } from 'node-dependency-injection';


import { UserCreator } from '../../users/application/UserCreator';
import { UserFinder } from '../../users/application/UserFinder';
import { UsersFinder } from '../../users/application/UsersFinder';
import { MongoUserRepository } from '../../users/infraestructure/MongoUserRepository';
import { CreatorUserController } from '../controllers/users/CreateUserController';
import { FinderUserController } from '../controllers/users/FinderUserController';
import { FinderUsersController } from '../controllers/users/FinderUsersController';


const container = new ContainerBuilder();
container
  .register('users.domain.UserRepository',MongoUserRepository)

container
  .register('users.application.UserCreator',UserCreator)
  .addArgument(container.get('users.domain.UserRepository'))

container
  .register('api.controller.CreateUsersController',CreatorUserController)
  .addArgument(container.get('users.application.UserCreator'))

container
  .register('users.application.UserFinder',UserFinder)
  .addArgument(container.get('users.domain.UserRepository'))

container
  .register('api.controller.FinderUserController',FinderUserController)
  .addArgument(container.get('users.application.UserFinder'))



container
  .register('users.application.UsersFinder',UsersFinder)
  .addArgument(container.get('users.domain.UserRepository'))

container
  .register('api.controller.FinderUsersController',FinderUsersController)
  .addArgument(container.get('users.application.UsersFinder'))



export default container;


