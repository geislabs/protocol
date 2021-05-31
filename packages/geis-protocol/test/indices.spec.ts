import { toArray } from 'ix/asynciterable'
import { createFetch } from './support/testFacade'

describe('indices', () => {
    test('simple', async () => {
        expect.hasAssertions()
        const fetch = createFetch('{"value:": 5}')
        await toArray(
            fetch('json://google.com', function* (_response, index) {
                expect(index).toBe(0)
                yield 1
                yield 2
                yield 3
            })
        )
    })
    test('multiple', async () => {
        const fetch = createFetch('{"value:": 5}', {
            eval: async function* (request) {
                yield { data: {}, request }
                yield { data: {}, request }
                yield { data: {}, request }
            },
        })
        const mock = jest.fn()
        await toArray(
            fetch('json://google.com', function* (_response, index) {
                mock(index)
                yield 1
                yield 2
                yield 3
            })
        )
        expect(mock).toHaveBeenNthCalledWith(1, 0)
        expect(mock).toHaveBeenNthCalledWith(2, 1)
        expect(mock).toHaveBeenNthCalledWith(3, 2)
    })
})
