/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { describe, expect, test } from 'vitest';
import { existsSync, promises as fs } from 'node:fs';
import { transform } from '../src';
import plugins from '../src/plugins';

describe('transform()', () => {
  test('generate alias from json', async () => {
    expect.assertions(plugins.length)
    await transform('./test/fixtures/alias.json', './test/output-json');
    for(const Plugin of plugins) {
      const { name } = new Plugin();
      const alias = (await fs.readFile(`./test/output-json/alias.${name}`)).toString();
      expect(alias).toMatchSnapshot();
    }
  });

  test('generate alias from yaml', async () => {
    expect.assertions(plugins.length)
    await transform('./test/fixtures/alias.yaml', './test/output-yaml');
    for(const Plugin of plugins) {
      const { name } = new Plugin();
      const alias = (await fs.readFile(`./test/output-yaml/alias.${name}`)).toString();
      expect(alias).toMatchSnapshot();
    }
  });

  test('generate alias with specified plugin', async () => {
    expect.assertions(plugins.length)
    await transform('./test/fixtures/alias.yaml', './test/output-specified', { plugins: ['sh'] });
    for(const Plugin of plugins) {
      const { name } = new Plugin();
      if (name === 'sh') {
        const alias = (await fs.readFile(`./test/output-specified/alias.${name}`)).toString();
        expect(alias).toMatchSnapshot();
      } else {
        expect(existsSync(`./test/output-specified/alias.${name}`)).toBeFalsy();
      }
    }
  });
});
