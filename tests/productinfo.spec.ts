
import { ResultsPage } from '../pages/ResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import {test ,expect} from '../fixtures/baseFixtures';

const search =[
    {searchkey: 'macbook', productname: 'MacBook Pro', imagecount: 4},
    {searchkey: 'macbook', productname: 'MacBook Air', imagecount: 4},
    {searchkey: 'samsung', productname: 'Samsung Galaxy Tab 10.1',imagecount: 7},
];

 for (const product of search){
test(`verify product header ${product.productname} `,{tag:['@product','@sanity','@regeression']} ,async ({ homePage }) => {
   
    const resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
    const productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);
    expect (await productInfoPage.getProductHeader()).toBe(product.productname);
    
});
 }

 for (const product of search){
test(`verify images count ${product.productname} : ${product.imagecount} `,{tag: ['@product','@sanity']}, async ({ homePage }) => {
   
    const resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
    const productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);
    expect(await productInfoPage.getProductImagesCount()).toBe(product.imagecount);
    
 });}

 test('verify product metadata ', async ({ homePage }) => {
    const resultsPage: ResultsPage = await homePage.doSearch('MacBook');
    const productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro');
    const actualProductFullDetails = await productInfoPage.getProductDetails();
    expect.soft(actualProductFullDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualProductFullDetails.get('Brand')).toBe('Apple');
    expect.soft(actualProductFullDetails.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductFullDetails.get('Reward Points')).toBe('800');
    expect.soft(actualProductFullDetails.get('Availability')).toBe('Out Of Stock');
 });

  test('verify product metaPrice', async ({ homePage }) => {
    
    const resultsPage: ResultsPage = await homePage.doSearch('MacBook');
    const productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro');
    const actualProductFullDetails = await productInfoPage.getProductDetails();
    expect.soft(actualProductFullDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualProductFullDetails.get('price')).toBe('$2,000.00');
    expect.soft(actualProductFullDetails.get('extraprice')).toBe('$2,000.00');
    
 });


