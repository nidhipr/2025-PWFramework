import { Locator, Page } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';
import { LoginPage } from '../pages/LoginPage';

export class ProductInfoPage{

// 1.Page Locators/objects/OR
    private readonly page: Page;
    private readonly eleUtil: ElementUtil;
    private readonly header: Locator;
    private readonly imageCount: Locator;
    private readonly productMetaData: Locator;
    private readonly productPriceData: Locator;

    private readonly productMap = new Map<string, string | number | null>();
    
    //2. Page class constructor
    constructor(page: Page){
      this.page = page;
      this.eleUtil = new ElementUtil(page);
      this.header = page.locator('h1');
      this.imageCount = page.locator(' div#content img');
      this.productMetaData = page.locator(`(//div[@id = 'content']//ul[@class = 'list-unstyled'])[1]/li`);
      this.productPriceData = page.locator(`(//div[@id = 'content']//ul[@class = 'list-unstyled'])[2]/li`);
      
    }

    async getProductHeader(): Promise<string> {
        const header =  await this.eleUtil.getInnerText(this.header);
        console.log('prooduct header: ' + header);
        return header.trim();

        }

        async getProductImagesCount(): Promise<number> {
            await this.eleUtil.waitForElementVisible(this.imageCount);
           const imagesCount =  await this.imageCount.count();
           console.log(`total num.of images for ${this.getProductHeader()} ==> ${imagesCount}`);
           return imagesCount;
        }


        async getProductDetails(): Promise<Map<string, string|number|null>> {
            this.productMap.set('header', await this.getProductHeader());
            this.productMap.set('imagescount', await this.getProductImagesCount());
            await this.getProductMetaData();
            await this.getproductPriceData();
            console.log(`Full product details: ${this.getProductHeader()}`);
            this.printProductDetails();
            return this.productMap;
        }

        private async printProductDetails(){
            for(const [key, value] of this.productMap){
                console.log(key,value);
        }
    }

    async getProductMetaData(){
        let productMetaData: string[] = await this.productMetaData.allInnerTexts();
         for(let meta of productMetaData){
        let metadata: string[] = meta.split(':');
        let metakey = metadata[0].trim();
        let metavalue = metadata[1].trim();
        this.productMap.set(metakey,metavalue);
}
 }


    async getproductPriceData(){
     let productPricing: string[] = await this.productPriceData.allInnerTexts();
      let productPrice = productPricing[0].trim();
      let prodExtax = productPricing[1].split(':')[1].trim();
      this.productMap.set('price', productPrice);
      this.productMap.set('extraprice',prodExtax);
    }
} 
