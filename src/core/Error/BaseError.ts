export type BaseError = BaseErrorIdentity & BaseErrorBody;

export type BaseErrorIdentity = {
  kind: symbol;
};

export type BaseErrorBody = {
  description: string;
  raw: unknown;
};
