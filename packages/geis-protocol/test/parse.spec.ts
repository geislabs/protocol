import { createFetch, header } from './support'

describe('parse', () => {
    test('simple', async () => {
        const fetch = createFetch('{"value": 5}')
        expect.hasAssertions()
        await fetch(
            'json://google.com',
            [header('content-type', 'application/json')],
            async (response) => {
                expect(response.request.headers).toStrictEqual({
                    'content-type': 'application/json',
                })
                return response.data
            }
        )
    })
})
