import 'dotenv/config';

import App from './app';
import AuthRoute from './routes/auth.route';
import PermissionRoute from "./routes/permission.route";
import RoleRoute from "./routes/role.route";
import UserRoute from './routes/user.route';

const server = new App([
  new AuthRoute(),
  new PermissionRoute(),
  new RoleRoute(),
  new UserRoute()
]);
server.app.listen(server.port, () => console.log(`Server is running on port ${server.port}`));
