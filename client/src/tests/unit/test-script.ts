/// <reference path = "../../main/type_definitions/jasmine/jasmine.d.ts"/>

describe("To ensure karma is installed and working", () =>
{
    it('Must be true that true = true', () => {
        expect(true).toBe(true);
    });
    
    it('Must be true that false = false', () => {
        expect(false).toBe(false);
    })

})