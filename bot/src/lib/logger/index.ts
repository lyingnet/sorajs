import chalk from 'chalk'
import { format } from 'util'


export class Logger {
    private get timestamp(): string {
		const now = new Date();
		const [year, month, day] = now.toISOString().substr(0, 10).split("-");
		return `${day}/${month}/${year} @ ${now.toISOString().substr(11, 8)}`;
	} 
    private log(prefix: string, ...args: string | any) {
        console.log(chalk.bold(prefix, chalk.whiteBright(format(...args))));
      }
    // Credits to CruiseShip (https://github.com/OtterDevelopment/CruiseShip/blob/main/lib/classes/Logger.ts)

    public info(...args: string | any) {
        this.log(chalk.blue(`[${this.timestamp}] INFO:`), args);
    }

    public debug(...args: string | any) {
        this.log(chalk.magenta(`[${this.timestamp}] DEBUG:`), args);
    }

    public fatal(...args: string | any) {
        this.log(chalk.red(`[${this.timestamp}] FATAL:`), args);
    }

    public warn(...args: string | any) {
        this.log(chalk.yellow(`[${this.timestamp}] WARN:`), args);
    }
}