export type JsonPrimitive = number | string | null | boolean;

export type JsonSerializable =
  | JsonPrimitive
  | JsonSerializable[]
  | {[P in string | number]?: JsonSerializable};

export type JsonString<T extends JsonSerializable = JsonSerializable> =
  string & {__jsonSerialized__: T};
