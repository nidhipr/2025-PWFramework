import { Locator, Page } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';

export class LoginPage{

    // 1.Page Locators/objects/OR
    private readonly page: Page;
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly warningMesg: Locator;
    private readonly eleUtil;
    private readonly registerLink: Locator;

    // 2.Page class constructor
    constructor(page: Page){
      this.page = page;
      this.eleUtil = new ElementUtil(page);
      this.emailId = page.locator('#input-email');
      this.password = page.locator('#input-password');
      this.loginBtn = page.locator('input.btn.btn-primary');
      this.warningMesg = page.locator('.alert.alert-danger.alert-dismissible');
      this.registerLink = page.locator(`//a[contains(normalize-space(), 'Register')]`);

    }

    // 3. page actions/method
    /**
     * Navigate to login page
     */
    async goToLoginPage(baseURL: string | undefined){
        await this.page.goto(baseURL+'?route=account/login');
    }
/**
 * login to app using valid username/password
 * @param email 
 * @param password 
 * @returns 
 */
    async doLogin(email: string, password: string): Promise<HomePage>{
         await this.eleUtil.fill(this.emailId, email);
         await this.eleUtil.fill(this.password, password);
         await this.eleUtil.click(this.loginBtn, { force: true, timeout:5000 });
         return new HomePage(this.page);
    }
/**
 * get the warining message in case of invalid login
 * @returns 
 */
    async getInvalidLoginMessage(): Promise<string | null> {
       const errorMesg = await this.eleUtil.getText(this.warningMesg);
       console.log(errorMesg);
       return errorMesg;
    }

    async navigateToRegisterPage(): Promise<RegisterPage>{
        await this.eleUtil.click(this.registerLink, {force: true } ,1);
        return new RegisterPage(this.page);
        
    }
    
}