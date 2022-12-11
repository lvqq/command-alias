export type HandlerParams = Record<string, Record<string, string>>;

abstract class Plugin {
  abstract name: string;

  abstract handler(config: HandlerParams): string;
}

export default Plugin;
