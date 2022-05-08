import chalk from 'chalk'
import { format } from 'util'


export class Logger {
    private get timestamp(): string {
		const now = new Date();
		const [year, month, day] = now.toISOString().substr(0, 10).split("-");
		return `${day}/${month}/${year} @ ${now.toISOString().substr(11, 8)}`;
	} 
    // Credits to CruiseShip (https://github.com/OtterDevelopment/CruiseShip/blob/main/lib/classes/Logger.ts)

    public info(...args: string | any) {
        console.log(chalk.bold(chalk.blue(`[${this.timestamp}] INFO:`)), chalk.whiteBright(format(...args)));
    }

    public debug(...args: string | any) {
        console.log(chalk.bold(chalk.magenta(`[${this.timestamp}] DEBUG:`)), chalk.whiteBright(format(...args)));
    }

    public fatal(...args: string | any) {
        console.log(chalk.bold(chalk.red(`[${this.timestamp}] FATAL:`)), chalk.whiteBright(format(...args)));
    }

    public warn(...args: string | any) {
        console.log(chalk.bold(chalk.yellow(`[${this.timestamp}] WARN:`)), chalk.whiteBright(format(...args)));
    }
}