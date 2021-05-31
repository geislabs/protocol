import { toArray } from 'ix/asynciterable'
import { createFetch } from './support/testFacade'

describe('context', () => {
    test('simple', async () => {
        expect.hasAssertions()
        const fetch = createFetch('{"value:": 5}')
        await toArray(
            fetch('json://google.com', function* (_response, _index, context) {
                expect(context).toStrictEqual({ context: true })
                yield 1
                yield 2
                yield 3
            })
        )
    })
})
