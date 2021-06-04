import { ProtocolResponse } from '../protocolTypes'

export function proxify<T extends ProtocolResponse>(value: T): T {
    return new Proxy<T>(value, {
        get(target, prop) {
            // @ts-expect-error
            if (prop.toString() === 'data' && typeof value.data === 'object') {
                // @ts-expect-error
                return proxify(value.data)
            }
            if (prop === Symbol.iterator) {
                return function* () {
                    for (const inner of value) {
                        if (typeof inner === 'object') {
                            // @ts-expect-error
                            yield proxify(inner)
                        }
                    }
                }
            }
            if (
                prop in target ||
                typeof prop === 'symbol' ||
                prop.toString().startsWith('$$')
            ) {
                // @ts-expect-error
                return Reflect.get(...arguments)
            }

            if (!value.get) {
                return
            }

            return value.get(prop.toString())
        },
    })
}
