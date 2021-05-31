const { config, mock } = require('@geislabs/geis')

const { cast, apply, browse, Integer, String } = config({
    adapter: mock({
        'http://google.com': `<html>
            <div class="title">hello</div>
            <div class="description">description</div>
            <div class="summary">summary</div>
            <div class="likes">15</div>
        </html>`,
    }),
})

describe('browse', () => {
    test('simple', async () => {
        await expect(
            apply(
                browse('http://google.com', (session) => ({
                    title: cast(session['.title'], String),
                    description: cast(session['.description'], String),
                    summary: cast(session['.summary'], String),
                    likes: cast(session['.likes'], Integer),
                }))
            )
        ).resolves.toStrictEqual({
            title: 'hello',
            description: 'description',
            summary: 'summary',
            likes: 15,
        })
    })
})
