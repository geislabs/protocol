import { createFetch } from './support/testFacade'

describe('promise', () => {
    test('simple', async () => {
        const fetch = createFetch('my response')
        await expect(
            fetch('text://google.com', async (response) => response.data)
        ).resolves.toBe('my response')
    })
    test('no callback', async () => {
        const fetch = createFetch('my response')
        const response = await fetch('text://google.com')
        expect(response.data).toBe('my response')
    })
})
