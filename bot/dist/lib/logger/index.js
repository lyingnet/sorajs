import chalk from 'chalk';
import { format } from 'util';
export class Logger {
    get timestamp() {
        const now = new Date();
        const [year, month, day] = now.toISOString().substr(0, 10).split("-");
        return `${day}/${month}/${year} @ ${now.toISOString().substr(11, 8)}`;
    }
    log(prefix, ...args) {
        console.log(chalk.bold(prefix, chalk.whiteBright(format(...args))));
    }
    // Credits to CruiseShip (https://github.com/OtterDevelopment/CruiseShip/blob/main/lib/classes/Logger.ts)
    info(...args) {
        this.log(chalk.blue(`[${this.timestamp}] INFO:`), args);
    }
    debug(...args) {
        this.log(chalk.magenta(`[${this.timestamp}] DEBUG:`), args);
    }
    fatal(...args) {
        this.log(chalk.red(`[${this.timestamp}] FATAL:`), args);
    }
    warn(...args) {
        this.log(chalk.yellow(`[${this.timestamp}] WARN:`), args);
    }
}
