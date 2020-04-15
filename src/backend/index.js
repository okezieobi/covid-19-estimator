import env from './env';
import app from './app';

const { appPort } = env;
const { warn } = console;

app.listen(appPort || 5000, () => warn(`App is live and listening on ${appPort || 5000}`));
