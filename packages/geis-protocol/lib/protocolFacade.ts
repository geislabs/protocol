import { runGenerator } from './generator/generatorFacade'
import { isAsyncGenerator, isGenerator } from './generator/generatorGuards'
import { runPromise } from './promise/promiseFacade'
import { getCallback, getConfig, getLocation } from './protocolHelpers'
import {
    Protocol,
    // ProtocolFn,
    ProtocolResponse,
    Proxy,
    Subprotocol,
} from './protocolTypes'
import {
    AnyCallbackFn,
    AnyGeneratorCallbackFn,
    PromiseCallbackFn,
    SyncCallbackFn,
} from './protocolValues'
import { proxify } from './proxy/proxyHelpers'

export type GetKey<TProto extends Protocol, TUrl extends string> =
    TUrl extends `${infer U & string}://${string}` ? U & keyof TProto : never

export type GetImpl<TProto extends Protocol, TUrl extends string> =
    TProto[GetKey<TProto, TUrl>]

export type GetInit<TProto extends Protocol, TUrl extends string> = GetImpl<
    TProto,
    TUrl
> extends Subprotocol<string, infer TInit>
    ? TInit
    : []

export type GetType<TProto extends Protocol, TUrl extends string> = GetImpl<
    TProto,
    TUrl
> extends Subprotocol<string, any, any, any, infer TRes>
    ? // @ts-expect-error
      Proxy<TRes>
    : never

export type GetContext<TProto extends Protocol, TUrl extends string> = GetImpl<
    TProto,
    TUrl
> extends Subprotocol<string, any, any, any, any, infer TContext>
    ? TContext
    : never

export function run<
    TProto extends Protocol,
    TUrl extends `${keyof TProto & string}://${string}`,
    TValue
>(
    protocol: TProto,
    url: TUrl,
    config: GetInit<TProto, TUrl>[],
    callback: AnyGeneratorCallbackFn<
        GetType<TProto, TUrl>,
        TValue,
        GetContext<TProto, TUrl>
    >
): AsyncGenerator<TValue>
export function run<
    TProto extends Protocol,
    TUrl extends `${keyof TProto & string}://${string}`,
    TValue
>(
    protocol: TProto,
    url: TUrl,
    config: GetInit<TProto, TUrl>[],
    callback:
        | PromiseCallbackFn<
              GetType<TProto, TUrl>,
              TValue,
              GetContext<TProto, TUrl>
          >
        | SyncCallbackFn<
              GetType<TProto, TUrl>,
              TValue,
              GetContext<TProto, TUrl>
          >
): Promise<TValue>
export function run<
    TProto extends Protocol,
    TUrl extends `${keyof TProto & string}://${string}`,
    TValue
>(
    protocol: TProto,
    url: TUrl,
    arg1:
        | GetInit<TProto, TUrl>[]
        | AnyCallbackFn<
              GetType<TProto, TUrl>,
              TValue,
              GetContext<TProto, TUrl>
          >,
    arg2: AnyCallbackFn<GetType<TProto, TUrl>, TValue, GetContext<TProto, TUrl>>
) {
    const callback = getCallback(arg1, arg2)
    const config = getConfig(arg1)
    const location = getLocation(url)
    const [protocolId] = url.split('://')
    const subprotocol = protocol[protocolId]
    if (!callback) {
        return new Promise(async (resolve) => {
            const context = await subprotocol.init()
            const request = await subprotocol.parse(location, config)
            const source = subprotocol.eval(request, context)
            for await (const value of source) {
                const proxied = proxify(value)
                return resolve(proxied)
            }
        })
    }
    if (isGenerator(callback) || isAsyncGenerator(callback)) {
        return runGenerator(
            subprotocol,
            location,
            config,
            // @ts-expect-error
            callback
        )
    }
    return runPromise(
        subprotocol,
        location,
        config,
        // @ts-expect-error
        callback
    )
}
