import { ProtocolResponse, Subprotocol } from '../protocolTypes'
import { AnyGeneratorCallbackFn } from '../protocolValues'
import { proxify } from '../proxy/proxyHelpers'

export function runGenerator<
    TType extends ProtocolResponse,
    TInit,
    TValue,
    TContext
>(
    protocol: Subprotocol<string, TInit, any, any, TType, TContext>,
    url: string,
    config: TInit[],
    callback: AnyGeneratorCallbackFn<TType, TValue, TContext>
): AsyncGenerator<TValue> {
    return (async function* () {
        let index = 0
        const context = await protocol.init()
        const request = await protocol.parse(url, config)
        const source = protocol.eval(request, context)
        for await (const instance of source) {
            const proxied = proxify(instance)
            try {
                yield* callback(proxied, index, context)
            } catch (error) {
                await protocol.dispose(instance)
                return Promise.reject(error)
            }
            index++
        }
    })()
}
