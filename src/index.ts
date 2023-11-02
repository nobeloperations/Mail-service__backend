import express, { Express, Request, Response } from 'express';

import * as EmailService from './services/email-service';

const app: Express = express();
const port = process.env.SERVER_PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  await EmailService.sendEmail('<RECIVER_MAIL>');
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});