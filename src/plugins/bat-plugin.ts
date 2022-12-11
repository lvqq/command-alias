import Plugin, { HandlerParams } from './plugin';

class BatPlugin extends Plugin {
  name: string;

  constructor() {
    super();
    this.name = 'bat';
  }

  handler(config: HandlerParams) {
    const aliaGroups = Object.keys(config).map(
      (groupName) =>
        `@REM ${groupName}\n${Object.keys(config[groupName])
          .map((key) => {
            const value = config[groupName][key];
            return `doskey ${key}=${value} $*`;
          })
          .join('\n')}`
    );
    return `@echo off\n\n${aliaGroups.join('\n\n')}\n`;
  }
}

export default BatPlugin;
