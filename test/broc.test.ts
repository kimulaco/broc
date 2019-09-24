import { name } from '../src/broc'

describe('name', (): void => {
    test('name is string', (): void => {
        expect(typeof name === 'string').toBeTruthy()
    })
})