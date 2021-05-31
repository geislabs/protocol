import {
    createProtocol,
    Subprotocol,
    Protocol,
    ProtocolResponse,
} from '../../lib'
import { FetchConfig } from './testTypes'

export interface TestContext {
    context: boolean
}

export interface TestRequest {
    headers: object
}

export interface TestResponse<T> extends ProtocolResponse<T> {
    data: T
    request: TestRequest
}

export interface TestTextProtocol
    extends Subprotocol<
        'text',
        FetchConfig,
        string,
        TestRequest,
        TestResponse<string>,
        TestContext
    > {}

export interface TestJsonProtocol
    extends Subprotocol<
        'json',
        FetchConfig,
        object,
        TestRequest,
        TestResponse<object>,
        TestContext
    > {}

export type TestProtocol = Protocol<TestTextProtocol | TestJsonProtocol>

export const createFetch = (
    response: string,
    overrides: Partial<Omit<Subprotocol, 'name'>> & {
        parse?: (selector: string) => any
    } = {}
) =>
    createProtocol<TestProtocol>({
        text: {
            name: 'text',
            init: async () => ({ context: true }),
            parse: async (_url, init) => ({
                headers: init.reduce(
                    (acc, config) => ({ ...acc, [config.name]: config.value }),
                    {}
                ),
            }),
            eval: async function* (request) {
                yield {
                    data: response,
                    request,
                    parse: () => 'parsed',
                    [Symbol.iterator]: () => ({
                        next: () => ({ done: true, value: null }),
                    }),
                }
            },
            dispose: async () => undefined,
            ...overrides,
        },
        json: {
            name: 'json',
            init: async () => ({ context: true }),
            parse: async (_url, init) => ({
                headers: init.reduce(
                    (acc, config) => ({ ...acc, [config.name]: config.value }),
                    {}
                ),
            }),
            eval: async function* (request) {
                const data = JSON.parse(response)
                const iterator = data[Symbol.iterator]
                    ? data[Symbol.iterator]
                    : [][Symbol.iterator]()
                yield {
                    data: data,
                    request,
                    parse: (selector) => data[selector] ?? null,
                    [Symbol.iterator]: iterator,
                }
            },
            dispose: async () => undefined,
            ...overrides,
        },
    })
