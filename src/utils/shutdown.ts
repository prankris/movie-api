import { closeDbConnections } from '../infrastructure/db';

export async function handleShutdown(signal: string): Promise<void> {
    console.log(`Received ${signal}. Cleaning up...`);
    await closeDbConnections();
    process.exit(0);
}
