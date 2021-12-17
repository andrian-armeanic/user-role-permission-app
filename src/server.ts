import 'dotenv/config';

import App from './app';

const port = process.env.PORT || 3000;
const server = new App();

server.app.listen(port, () => console.log(`Server is running on port ${port}`));
