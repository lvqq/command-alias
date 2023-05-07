import yaml from 'js-yaml';
import { existsSync, promises as fs } from 'node:fs';
import path from 'node:path';
import plugins from './plugins';
import { HandlerParams } from './plugins/plugin';
import { JSONParse } from './utils';

interface Options {
  filename?: string;
  plugins?: string[];
}

export const transform = async (
  source: string,
  outDir: string,
  options?: Options
) => {
  const config = (await fs.readFile(path.resolve(source))).toString();
  let alias: HandlerParams;
  if (source.endsWith('.yaml') || source.endsWith('yml')) {
    alias = yaml.load(config) as HandlerParams;
  } else {
    alias = JSONParse(config);
  }
  if (!existsSync(outDir)) {
    await fs.mkdir(outDir, { recursive: true });
  }
  await Promise.all(
    plugins.map(async (Plugin) => {
      const plugin = new Plugin();
      if (
        Array.isArray(options?.plugins) &&
        !options?.plugins?.includes(plugin.name)
      )
        return;
      const filename = path.resolve(
        outDir,
        `${options?.filename ?? 'alias'}.${plugin.name}`
      );
      await fs.writeFile(filename, plugin.handler(alias));
    })
  );
};
