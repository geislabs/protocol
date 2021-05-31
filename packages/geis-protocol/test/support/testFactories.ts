import { FetchConfig } from './testTypes'

export function header(name: string, value: string): FetchConfig {
    return { kind: 'header', name, value }
}
