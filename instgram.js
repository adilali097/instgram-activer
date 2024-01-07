const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to Instagram login page
  await page.goto('https://www.instagram.com/accounts/login/');

  // Enter your Instagram username and password using readline-sync
  const username = readlineSync.question('Enter your Instagram username: ');
  const password = readlineSync.question('Enter your Instagram password: ', {
    hideEchoBack: true, // Hide user input for passwords
  });

  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);

  // Click on the login button
  await page.click('button[type="submit"]');

  // Wait for the page to load
  await page.waitForNavigation();

  // Check if the login was successful
  const loginError = await page.$('p[id="slfErrorAlert"]');
  if (loginError) {
    console.log('Login failed. Please check your username and password.');
    await browser.close();
    return;
  }

  // Activate the account
  await page.click('button[type="button"]');

  // Wait for the account activation process to complete
  await page.waitForSelector('div[class="coreSpriteVerifiedBadge"]');

  console.log('Account activated successfully!');

  // Close the browser
  await browser.close();
})();
