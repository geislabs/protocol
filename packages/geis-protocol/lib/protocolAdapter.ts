export interface ProtocolAdapter<TType, TInit = unknown> {
    create: (config: TInit) => Promise<TType>
    destroy: (type: TType) => Promise<void>
}
