import addCommas from '../addCommas';

describe('add Commas function', () => {

    it('should proper convert', () => {
        expect(addCommas(1000)).toEqual('1,000');
        expect(addCommas(10)).toEqual('10');
        expect(addCommas(1)).toEqual('1');
        expect(addCommas(1234.12)).toEqual('1,234');
        expect(addCommas(1000000)).toEqual('1,000,000');
        expect(addCommas(-1000)).toEqual('-1,000');
        expect(addCommas("+1000")).toEqual('+1,000');
    })

    it('should avoid null and undefined', () => {
        expect(addCommas(undefined)).toEqual(undefined);
        expect(addCommas(null)).toEqual(null);
    })
})