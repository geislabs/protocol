import { toArray } from 'ix/asynciterable'
import { createFetch } from './support'

describe('proxy', () => {
    test('simple', async () => {
        const fetch = createFetch('{"value": 5}')
        const response = await fetch('json://google.com')
        expect(response['value']).toBe(5)
    })
    test('nested', async () => {
        const fetch = createFetch('{"outer": {"value": 5}}')
        const response = await fetch('json://google.com')
        expect(response['outer']['value']).toBe(5)
    })
    test('data', async () => {
        const fetch = createFetch('{"outer": {"value": 5}}')
        const response = await fetch('json://google.com')
        expect(response.data['outer']['value']).toBe(5)
    })
    test('callback', async () => {
        const fetch = createFetch('{"value": 5}')
        expect(
            await fetch('json://google.com', (response) => response['value'])
        ).toBe(5)
    })
    test('generator', async () => {
        const fetch = createFetch('{"value": 5}')
        expect(
            await toArray(
                fetch('json://google.com', function* (response) {
                    yield response['value']
                })
            )
        ).toStrictEqual([5])
    })
})
