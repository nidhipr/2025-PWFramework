
import { ResultsPage } from '../pages/ResultsPage';
import {test ,expect} from '../fixtures/baseFixtures';

//data provider for product search key & results count
const searchData = [ 
    {searchkey: 'macbook' , resultcount: 3 },
    {searchkey: 'samsung' , resultcount: 2 },
    {searchkey: 'imac' , resultcount: 1 },
    {searchkey: 'canon' , resultcount: 1 },
    {searchkey: 'Dummy' , resultcount: 0 }
];
for (const product of searchData){

test(`verify product search  ${ product.searchkey }`,{tag: ['@search', '@sanity']}, async ({ homePage }) => {
   
    const resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
    expect (await resultsPage.getSearchResultsCount()).toBe(product.resultcount);
});
}