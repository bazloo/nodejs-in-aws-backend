const findProductsById = require('../product-service/helpers/findProductsById');
const arrayOfProducts = require('../fakeDB-service/handlers/fakeDB.json');
const someCorrectId = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';

test('Function should return an object',()=>{
    expect( typeof findProductsById(arrayOfProducts, someCorrectId)).toBe('object');
});

test('Function should return exact object inside an array',()=>{
    expect(findProductsById(arrayOfProducts, someCorrectId)).toStrictEqual([arrayOfProducts[0]]);
});

test('Function should return an array with length equal to 1 or less then 2',()=>{
    expect(findProductsById(arrayOfProducts, someCorrectId).length).toBe(1);
    expect(findProductsById(arrayOfProducts, someCorrectId).length).toBeLessThan(2);
});