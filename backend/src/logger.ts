import fs from 'fs';
import path from 'path';

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(
  logDir,
  `poker_log_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`
);

const originalConsoleLog = console.log;

function logToFile(message: string) {
  fs.appendFileSync(logFile, message + '\n');
}

// ✅ This function replaces console.log with one that logs to both terminal and file
export function hookConsoleLog() {
  console.log = (...args: any[]) => {
    const message = args.join(' ');
    originalConsoleLog(message);
    logToFile(message);
  };
}