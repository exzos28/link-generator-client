export interface AppLifecycle {
  readonly initialized: boolean;
  readonly hasJustBeenInstalled: boolean;
  purge(): Promise<void>;
}
