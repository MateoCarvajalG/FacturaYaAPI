import { ContainerBuilder } from 'node-dependency-injection';


import { UserCreator } from '../../users/application/UserCreator';
import { UserFinder } from '../../users/application/UserFinder';
import { UserRemover } from '../../users/application/UserRemover';
import { UsersFinder } from '../../users/application/UsersFinder';
import { UserUpdater } from '../../users/application/UserUpdater';
import { MongoUserRepository } from '../../users/infraestructure/MongoUserRepository';
import { CreatorUserController } from '../controllers/users/CreateUserController';
import { FinderUserController } from '../controllers/users/FinderUserController';
import { FinderUsersController } from '../controllers/users/FinderUsersController';
import { RemoverUserController } from '../controllers/users/RemoverUserController';
import { UpdaterUserController } from '../controllers/users/UpdaterUserController';


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

container
  .register('users.application.UserUpdater',UserUpdater)
  .addArgument(container.get('users.domain.UserRepository'))

container
  .register('api.controller.UpdateUserController',UpdaterUserController)
  .addArgument(container.get('users.application.UserUpdater'))

container
  .register('users.application.UserRemover',UserRemover)
  .addArgument(container.get('users.domain.UserRepository'))

container
  .register('api.controller.RemoverUserController',RemoverUserController)
  .addArgument(container.get('users.application.UserRemover'))


export default container;


