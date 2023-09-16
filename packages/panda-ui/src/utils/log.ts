const prefix: string = '[Panda-UI]';

const isProd: boolean = process.env.NODE_ENV === 'production';

export function deprecated(msg: string, ...others: any[]): void {
  console.error(`${prefix} [deprecated]: ${msg}`, ...others);
}

export function error(msg: string, ...others: any[]): void {
  console.error(`${prefix} [error]: ${msg}`, ...others);
}

export function warning(msg: string, ...others: any[]): void {
  !isProd && console.warn(`${prefix} [warning]: ${msg}`, ...others);
}

export function info(msg: string, ...others: any[]): void {
  !isProd && console.info(`${prefix} [info]: ${msg}`, ...others);
}
