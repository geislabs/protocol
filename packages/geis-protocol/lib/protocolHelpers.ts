import { GetContext, GetInit, GetType } from './protocolFacade'
import { Protocol } from './protocolTypes'
import { AnyCallbackFn } from './protocolValues'

export function getCallback<
    TProto extends Protocol,
    TUrl extends `${keyof TProto & string}://${string}`,
    TValue
>(
    arg1:
        | AnyCallbackFn<GetType<TProto, TUrl>, TValue, GetContext<TProto, TUrl>>
        | GetInit<TProto, TUrl>[],
    arg2: AnyCallbackFn<GetType<TProto, TUrl>, TValue, GetContext<TProto, TUrl>>
): AnyCallbackFn<
    GetType<TProto, TUrl>,
    TValue,
    GetContext<TProto, TUrl>
> | null {
    if (typeof arg1 === 'function') {
        return arg1
    }
    if (typeof arg2 === 'function') {
        return arg2
    }
    return null
}

export function getConfig<
    TProto extends Protocol,
    TUrl extends `${keyof TProto & string}://${string}`,
    TValue
>(
    arg1?:
        | AnyCallbackFn<GetType<TProto, TUrl>, TValue, GetContext<TProto, TUrl>>
        | GetInit<TProto, TUrl>[]
): GetInit<TProto, TUrl>[] {
    if (Array.isArray(arg1)) {
        return arg1
    }
    return []
}

export function getLocation<
    TProto extends Protocol,
    TUrl extends `${keyof TProto & string}://${string}`
>(url: TUrl): string {
    const [, rest] = url.split('://')
    return rest
}
