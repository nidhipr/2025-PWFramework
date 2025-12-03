import { Locator, Page } from '@playwright/test';
import { ElementUtil} from '../utils/ElementUtil';

export class RegisterPage{

    //locators creations
    private readonly page: Page;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly newsletterYes: Locator;
    private readonly newsletterNo: Locator;
    private readonly ppCheckBox: Locator;
    private readonly continueButton: Locator;
    private readonly eleUtil : ElementUtil;
    private readonly successMess: Locator;

     //constructor creationsw
     constructor(page:Page){
      this.page =page;
      this.eleUtil = new ElementUtil(page);
      this.firstName = page.getByLabel('First Name');
      this.lastName = page.getByLabel('Last Name');
      this.email = page.getByLabel('E-Mail');
      this.telephone = page.getByLabel('Telephone');
      this.password = page.getByLabel('Password');
      this.confirmPassword = page.getByLabel('Password Confirm');
      this.newsletterYes = page.getByLabel('Yes');
      this.newsletterNo = page.getByLabel('No');
      this.ppCheckBox = page.locator('//input[@name="agree"]');
      this.continueButton = page.getByRole('button', { name: 'Continue' });
      this.successMess = page.getByText('Your Account Has Been Created!', { exact:  true});
     }

     async registerUser(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        //confirmPassword: string,
        newsletter: string): Promise<boolean> {

            await this.eleUtil.fill(this.firstName,firstName);
            await this.eleUtil.fill(this.lastName,lastName);
            await this.eleUtil.fill(this.email,email);
            await this.eleUtil.fill(this.telephone,telephone);
            await this.eleUtil.fill(this.password,password);
            await this.eleUtil.fill(this.confirmPassword,   password);
         if(newsletter === 'Yes'){
            await this.eleUtil.click(this.newsletterYes);
         }
         else {
           await this.eleUtil.click(this.newsletterNo);
         }
          await this.eleUtil.click(this.ppCheckBox);
          await this.eleUtil.click(this.continueButton);
          return await this.eleUtil.isVisible(this.successMess);

            }
           


 }


     





    



