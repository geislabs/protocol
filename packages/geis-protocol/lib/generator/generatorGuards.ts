import util from 'util'
import {
    AnyCallbackFn,
    AsyncGeneratorCallbackFn,
    GeneratorCallbackFn,
} from '../protocolValues'

export function isAsyncGenerator<TType, TValue, TContext>(
    callback: AnyCallbackFn<TType, TValue, TContext>
): callback is AsyncGeneratorCallbackFn<TType, TValue, TContext> {
    return callback.toString().includes('asyncGenerator')
}

export function isGenerator<TType, TValue, TContext>(
    callback: AnyCallbackFn<TType, TValue, TContext>
): callback is GeneratorCallbackFn<TType, TValue, TContext> {
    return util.types.isGeneratorFunction(callback)
}
