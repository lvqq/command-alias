import Plugin, { HandlerParams } from './plugin';

class Ps1Plugin extends Plugin {
  name: string;

  constructor() {
    super();
    this.name = 'ps1';
  }

  handler(config: HandlerParams) {
    const aliaGroups = Object.keys(config).map(
      (groupName) =>
        `# ${groupName}\n${Object.keys(config[groupName])
          .map((key) => {
            const value = config[groupName][key];
            return `function ${key} {\n  ${value} $args\n}`;
          })
          .join('\n\n')}`
    );
    return `#!/usr/bin/env pwsh\n\n${aliaGroups.join('\n\n')}\n`;
  }
}

export default Ps1Plugin;
