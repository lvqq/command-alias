import Plugin, { HandlerParams } from './plugin';

class ShPlugin extends Plugin {
  name: string;

  constructor() {
    super();
    this.name = 'sh';
  }

  handler(config: HandlerParams) {
    const aliaGroups = Object.keys(config).map(
      (groupName) =>
        `# ${groupName}\n${Object.keys(config[groupName])
          .map((key) => {
            const value = config[groupName][key];
            return `alias ${key}='${value}'`;
          })
          .join('\n')}`
    );
    return `${aliaGroups.join('\n\n')}\n`;
  }
}

export default ShPlugin;
