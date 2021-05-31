import { createFetch } from './support/testFacade'

describe('promise', () => {
    test('simple', async () => {
        const fetch = createFetch('my response')
        await expect(
            fetch('text://google.com', (response) => response.data)
        ).resolves.toBe('my response')
    })
})
