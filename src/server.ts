import 'dotenv/config';

import App from './app';
import AuthRoute from './rest/routes/auth.route';
import PermissionRoute from "./rest/routes/permission.route";
import RoleRoute from "./rest/routes/role.route";
import UserRoute from './rest/routes/user.route';

const server = new App([
  new AuthRoute(),
  new PermissionRoute(),
  new RoleRoute(),
  new UserRoute()
]);
server.app.listen(console.log(`Server is running on port ${server.port}`));
