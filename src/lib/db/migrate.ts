import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '.';

export const main = async () => {
    console.log('migrations running')
    await migrate(db, {migrationsFolder: "drizzle"})
    console.log('migrations finished');
}

main().then(() => {
    console.log('finished');
}).catch((error) => {
    console.log('error: ' + error);
}).finally(() => {
    process.exit();
});
