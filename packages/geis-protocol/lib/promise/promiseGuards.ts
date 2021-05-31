import util from 'util'
import { AnyCallbackFn, PromiseCallbackFn } from '../protocolValues'

export function isPromise<TType, TValue, TContext>(
    callback: AnyCallbackFn<TType, TValue, TContext>
): callback is PromiseCallbackFn<TType, TValue, TContext> {
    return util.types.isAsyncFunction(callback)
}
