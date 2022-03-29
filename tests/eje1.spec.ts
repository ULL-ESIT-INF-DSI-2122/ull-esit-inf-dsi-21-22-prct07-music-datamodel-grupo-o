import 'mocha';
import { expect } from 'chai';
import { add } from '../src/eje1' 

describe ( 'Test' , () => {
    it("Test1", () => {
        expect(add(1,2)).to.eq(3);
    });
});