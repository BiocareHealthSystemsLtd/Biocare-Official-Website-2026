import fs from 'fs';
import path from 'path';

export function createDatabaseBackup(filename) {
  const sourcePath = path.join(process.cwd(), 'src/data', `${filename}.json`);
  const backupDir = path.join(process.cwd(), 'src/data/backups');

  try {
    // 1. Create backups folder if it does not exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // 2. Read source file if it exists
    if (fs.existsSync(sourcePath)) {
      const content = fs.readFileSync(sourcePath, 'utf8');
      const timestamp = Math.floor(Date.now() / 1000);
      const destinationPath = path.join(backupDir, `${filename}_${timestamp}.json`);
      
      // 3. Write backup copy
      fs.writeFileSync(destinationPath, content, 'utf8');
      console.log(`[Backup Success] Created copy of ${filename}.json at ${destinationPath}`);
      return true;
    }
  } catch (err) {
    console.error(`[Backup Error] Failed to copy database file: ${filename}`, err);
  }
  return false;
}
