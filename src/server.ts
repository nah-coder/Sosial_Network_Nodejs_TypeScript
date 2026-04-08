import 'dotenv/config';
import App from './app';
import { validateEnv } from './core/utils';
import { IndexRoute } from './modules/index';
import UsersRoute from '@modules/users/user.route';
import AuthRoute from '@modules/auth/auth.route';
import ProfileRoute from '@modules/profile/profile.route';
import PostsRoute from '@modules/posts/dtos/posts.route';
import GroupsRoute from '@modules/groups/dtos/groups.route';

validateEnv();

const routes = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProfileRoute(),
  new PostsRoute(),
  new GroupsRoute(),
//   new ConversationsRoute(),
];

const app = new App(routes);  

app.listen();