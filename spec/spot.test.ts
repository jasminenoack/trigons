import { Spot } from "../src/spot";

describe('spot', () => {
    let spot;

    beforeEach(() => {
        spot = new Spot(true, 5)
    })

    it('creates a spot', () => {
        expect(spot).toBeTruthy()
        expect(spot.up).toEqual(true)
        expect(spot.value).toEqual(5)
    })
})