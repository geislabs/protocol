export type SyncCallbackFn<TType, TValue, TContext> = (
    session: TType,
    index: number,
    context: TContext
) => TValue

export type PromiseCallbackFn<TType, TValue, TContext> = (
    session: TType,
    index: number,
    context: TContext
) => Promise<TValue>

export type GeneratorCallbackFn<TType, TValue, TContext> = (
    session: TType,
    index: number,
    context: TContext
) => Generator<TValue>

export type AsyncGeneratorCallbackFn<TType, TValue, TContext> = (
    session: TType,
    index: number,
    context: TContext
) => AsyncGenerator<TValue>

export type AnyGeneratorCallbackFn<TType, TValue, TContext> =
    | GeneratorCallbackFn<TType, TValue, TContext>
    | AsyncGeneratorCallbackFn<TType, TValue, TContext>

export type AnyCallbackFn<TType, TValue, TContext> =
    | SyncCallbackFn<TType, TValue, TContext>
    | PromiseCallbackFn<TType, TValue, TContext>
    | AnyGeneratorCallbackFn<TType, TValue, TContext>
