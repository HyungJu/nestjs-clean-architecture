export type event = symbol | string;
export type eventNS = string | event[];

export interface EventEmitter {
  emit(event: event | eventNS, ...args: any[]): boolean;
  emitAsync(event: event | eventNS, ...args: any[]): boolean;
}
