import { DataSource } from '@database/data-source';
import { app } from '@app';

const port = process.env.PORT || 3000;

DataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
    process.exit(1);
  });
