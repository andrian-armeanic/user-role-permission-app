import { connect, set } from "mongoose";

export default function connectToDatabase(env: string) {

  if (env !== 'production') {
    set('debug', true);
  }
  connect(process.env.MONGO_URI)
    .then(() => console.log('Database connection established!'))
    .catch((err) => console.log('Database connection issue: ' + err.message));
};
