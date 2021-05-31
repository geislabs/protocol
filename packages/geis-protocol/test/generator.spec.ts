import { toArray } from 'ix/asynciterable'
import { createFetch } from './support/testFacade'

describe('generator', () => {
    test('simple', async () => {
        const fetch = createFetch('{"value:": 5}')
        await expect(
            toArray(
                fetch('json://google.com', function* () {
                    yield 1
                    yield 2
                    yield 3
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
    test('async', async () => {
        const fetch = createFetch('{"value:": 5}')
        await expect(
            toArray(
                fetch('json://google.com', async function* () {
                    yield 1
                    yield 2
                    yield 3
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
})
