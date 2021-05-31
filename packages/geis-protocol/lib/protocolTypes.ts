import { ProtocolAdapter } from './protocolAdapter'
import { GetContext, GetInit, GetType } from './protocolFacade'
import { AnyGeneratorCallbackFn, PromiseCallbackFn } from './protocolValues'

export interface Subprotocol<
    TName extends string = string,
    TInit = any,
    TValue = any,
    TReq = any,
    TRes = any,
    TContext = any
> {
    name: TName
    init: () => Promise<TContext>
    parse: (url: string, init: TInit[]) => Promise<TReq>
    eval: (request: TReq, context: TContext) => AsyncGenerator<TRes>
    dispose: (resouce: TRes) => Promise<void>
}

export type Protocol<TSub extends Subprotocol = Subprotocol> = {
    [P in TSub['name']]: Extract<TSub, { name: P }>
}

export interface ProtocolFn<
    TProto extends Protocol = Protocol,
    TGlobals = unknown
> {
    // Promises
    <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
        url: TUrl,
        callback: PromiseCallbackFn<
            GetType<TProto, TUrl>,
            TValue,
            GetContext<TProto, TUrl>
        >,
        globals?: Partial<TGlobals>
    ): Promise<TValue>
    <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
        url: TUrl,
        init: GetInit<TProto, TUrl>[],
        callback: PromiseCallbackFn<
            GetType<TProto, TUrl>,
            TValue,
            GetContext<TProto, TUrl>
        >,
        globals?: Partial<TGlobals>
    ): Promise<TValue>
    // Generators
    <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
        url: TUrl,
        callback: AnyGeneratorCallbackFn<
            GetType<TProto, TUrl>,
            TValue,
            GetContext<TProto, TUrl>
        >,
        globals?: Partial<TGlobals>
    ): AsyncGenerator<TValue>
    // fetch('...', { ... })
    <TUrl extends `${string & keyof TProto}://${string}`>(
        url: TUrl,
        globals?: Partial<TGlobals>
    ): TUrl extends `${infer TType}://${string}`
        ? TProto[TType] extends Subprotocol<any, any, any, any, infer TResp>
            ? // @ts-expect-error
              Promise<Proxy<TResp>>
            : never
        : never
}

export interface ProtocolResponse<TValue = unknown> extends Iterable<TValue> {
    // data: TValue
    parse: (selector: string) => TValue
}

// @ts-expect-error
export interface Proxy<T extends ProtocolResponse> extends T {
    // @ts-expect-error
    [key: string]: T extends ProtocolResponse<infer U> ? Proxy<U> : never
}

// type GetValueType<TUrl extends string, TProto extends Subprotocol<any, any>> =
//     TUrl extends `${infer TData}://${infer _TRest}` ? TProto[TData] : never

// export interface Protocol<
//     TProto extends ProtocolMap = ProtocolMap,
//     TInit = unknown,
//     TGlobals extends object = object
// > {
//     <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
//         url: TUrl,
//         callback: (type: GetValueType<TUrl, TProto>) => Promise<TValue>,
//         globals?: Partial<TGlobals>
//     ): Promise<TValue>
//     // <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
//     //     url: TUrl,
//     //     callback: (type: GetValueType<TUrl, TProto>) => Generator<TValue>,
//     //     globals: TGlobals
//     // ): AsyncGenerator<TValue>
//     // <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
//     //     url: TUrl,
//     //     config?: TInit[],
//     //     callback?: (type: GetValueType<TUrl, TProto>) => Promise<TValue>,
//     //     globals?: TGlobals
//     // ): Promise<TValue>
//     <TUrl extends `${keyof TProto & string}://${string}`>(
//         url: TUrl,
//         globals?: Partial<TGlobals>
//     ): Promise<GetValueType<TUrl, TProto>>
//     <TUrl extends `${keyof TProto & string}://${string}`>(
//         url: TUrl,
//         init: TInit[],
//         globals?: Partial<TGlobals>
//     ): Promise<GetValueType<TUrl, TProto>>
//     // <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
//     //     url: TUrl,
//     //     globals: TGlobals
//     // ): Promise<GetValueType<TUrl, TProto>>
//     // <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
//     //     url: TUrl,
//     //     init: TInit[],
//     //     globals?: TGlobals
//     // ): Promise<TValue>
//     // <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
//     //     url: TUrl,
//     //     callback: AsyncGenerator<TValue>,
//     //     globals?: TGlobals
//     // ): AsyncGenerator<TValue>
// }

// // interface FetchResp<T> {}
// // const fetch = {} as Protocol<
// //     { html: FetchResp<string>; json: FetchResp<object> },
// //     any,
// //     any
// // >

// // const promise1 = fetch('json://google.com')
// // const promise2 = fetch('json://google.com', async (resp) => resp)
