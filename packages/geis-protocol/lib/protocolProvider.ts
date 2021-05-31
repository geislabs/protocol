import { GetContext, GetInit, GetType, run } from './protocolFacade'
import { AnyCallbackFn } from './protocolValues'
import { Protocol, ProtocolFn } from './protocolTypes'

export function createProtocol<TProto extends Protocol>(
    protocol: TProto
): ProtocolFn<TProto> {
    // @ts-expect-error
    return <TValue, TUrl extends `${keyof TProto & string}://${string}`>(
        url: TUrl,
        arg1?:
            | GetInit<TProto, TUrl>
            | AnyCallbackFn<
                  GetType<TProto, TUrl>,
                  TValue,
                  GetContext<TProto, TUrl>
              >,
        arg2?: AnyCallbackFn<
            GetType<TProto, TUrl>,
            TValue,
            GetContext<TProto, TUrl>
        >
    ) =>
        run(
            protocol,
            url,
            //@ts-expect-error
            arg1,
            arg2
        )
}
