
import { LoginPage } from '../pages/LoginPage';
import {test ,expect} from '../fixtures/baseFixtures';

test('verify valid Login @login @sanity',
    
    {
        annotation: [
            {type: 'epic', description: 'EPIC-100 Design login page for Open Cart App'},
            {type: 'feature',description: 'Login Page Feature'},
            {type: 'story', description: 'ST -10 Login to the app'},
            {type: 'severity', description: 'Blocker'},
            {type: 'owner', description: 'Nidhi Priya'}       
        ]
   },
    async ({ homePage }) => {
await expect(homePage.page).toHaveTitle('My Account');
});

test('verify invalid Login ', async({ page,baseURL })=>{
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    await loginPage.doLogin('pwtest11@test.com','test121311');
    const errormesg = await loginPage.getInvalidLoginMessage();
    expect (errormesg).toContain(' Warning: No match for E-Mail Address and/or Password.');
});
