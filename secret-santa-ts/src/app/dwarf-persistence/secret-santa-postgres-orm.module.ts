import { TypeOrmModule } from '@nestjs/typeorm';

export const SecretSantaPostgresOrmModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: 5432,
    password: process.env.POSTGRES_PWD ?? 'secret-santa',
    username: process.env.POSTGRES_USERNAME ?? 'secret-santa',
    database: process.env.POSTGRES_DB_NAME ?? 'secret-santa',
    entities: [...entities],
    synchronize: true,
    logging: true,
  });
