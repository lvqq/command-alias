# command-alias

[![npm version](https://img.shields.io/npm/v/command-alias.svg)](https://www.npmjs.com/package/command-alias) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/lvqq/command-alias/ci.yml?branch=main) [![Coverage Status](https://coveralls.io/repos/github/lvqq/command-alias/badge.svg?branch=main)](https://coveralls.io/github/lvqq/command-alias?branch=main) ![GitHub](https://img.shields.io/github/license/lvqq/command-alias)

Generate alias for different command system, support `zsh/bash` and `Windows Command/PowerShell`.

## Usage
### Installation
```bash
# npm
npm install command-alias --save-dev

# yarn
yarn add command-alias --dev

# pnpm 
pnpm add command-alias --save-dev
```

### Api
Using the following api will generate a few alias file under output directory throught `alias.yaml`:
```typescript
import { transform } from 'command-alias'

transform('alias.yaml', 'output')
```


### Params
```typescript
type generateCommandAliasByPlugin =  (
  source: string,
  outDir: string,
  options?: Options
) => Promise<void>

type Options = {
  filename?: string;
  plugins?: string[];
}
```
#### source
Alias config filepath, support `json/yaml` format.

- source file yaml [example](https://github.com/x-toolkit/command-alias/blob/main/test/fixtures/alias.yaml):
```yaml
part1:
  sa: short alias
part2:
  saa: short alias with optionA
  sab: short alias with optionB
```

- source file json [example](https://github.com/x-toolkit/command-alias/blob/main/test/fixtures/alias.json):
```json
{
  "part1": {
    "sa": "short alias"
  },
  "part2": {
    "saa": "short alias with optionA",
    "sab": "short alias with optionB"
  }
}
```

#### outDir
Alias output directory, all alias files will be placed under outDir.

#### options
Optional configs.
##### options.filename
Define the output filename, default is `alias`.
##### options.plugins
Define the using plugins to generate, without specifying will use all plugins by default. 

Support options:
- `sh`: for bash-like command, like `zsh/bash`
- `bat`: for `Windows Command`
- `ps1`: for `Windows PowerShell`

## Development
Install dependencies:
```bash
pnpm install
```

Make changes and run tests:
```bash
pnpm run test
```

# License
[MIT](https://github.com/x-toolkit/command-alias/blob/main/LICENSE)
