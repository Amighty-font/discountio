const puppeteer = require('puppeteer');
            
class Product {
    constructor(link, price, sold_out) {
        this.link = link;
        this.price = price;
        this.sold_out = sold_out;
    }

    getLink() {
        return this.link;
    }

    getPrice() {
        return this.price;
    }

    getSoldOut() {
        return this.sold_out;
    }

    setPrice(price) {
        this.price = price;
    }

    setSoldOut(sold_out) {
        this.sold_out = sold_out;
    }
}


async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    const [e1] = await page.$x('//*[@id="productTitle"]');
    const src = await e1.getProperty('textContent');
    const title = await src.jsonValue();

    var price;
    // try to grab price
    try {
        // check for deal
        const [e2] = await page.$x('//*[@id="corePrice_desktop"]/div/table/tbody/tr[1]/td[2]/span[1]/span[2]');
        const src2 = await e2.getProperty('textContent');
        price = await src2.jsonValue();
        const [e3] = await page.$x('//*[@id="corePrice_desktop"]/div/table/tbody/tr[2]/td[2]/span[1]/span[2]');
        const src3 = await e3.getProperty('textContent');
        price = await src3.jsonValue();
        
    } catch (error) {
        try {
            // checks with normal price
            const [e4] = await page.$x('//*[@id="corePrice_desktop"]/div/table/tbody/tr/td[2]/span[1]/span[2]');
            const src4 = await e4.getProperty('textContent');
            price = await src4.jsonValue();
        } catch (error2) {
            price = "Unavailable"
        }
    } 

    // console.log({title, price});
    console.log(price);

    browser.close();
}

// checks sold out product
async function scrapeProductSoldOut(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    const [e1] = await page.$x('//*[@id="productTitle"]');
    const src = await e1.getProperty('textContent');
    const title = await src.jsonValue();

    var price;
    // try to grab price
    try {
        // check for deal
        const [e2] = await page.$x('//*[@id="corePrice_desktop"]/div/table/tbody/tr[1]/td[2]/span[1]/span[2]');
        const src2 = await e2.getProperty('textContent');
        price = await src2.jsonValue();
        const [e3] = await page.$x('//*[@id="corePrice_desktop"]/div/table/tbody/tr[2]/td[2]/span[1]/span[2]');
        const src3 = await e3.getProperty('textContent');
        price = await src3.jsonValue();
        
    } catch (error) {
        try {
            // checks with normal price
            const [e4] = await page.$x('//*[@id="corePrice_desktop"]/div/table/tbody/tr/td[2]/span[1]/span[2]');
            const src4 = await e4.getProperty('textContent');
            price = await src4.jsonValue();
        } catch (error2) {
            return 1;
        }
    }

    browser.close();

    return 0;
}

// gets updated price of product
async function scrapeProductPrice(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    const [e1] = await page.$x('//*[@id="productTitle"]');
    const src = await e1.getProperty('textContent');
    const title = await src.jsonValue();

    var price;
    // try to grab price
    try {
        // check for deal
        const [e2] = await page.$x('//*[@id="corePrice_desktop"]/div/table/tbody/tr[1]/td[2]/span[1]/span[2]');
        const src2 = await e2.getProperty('textContent');
        price = await src2.jsonValue();
        const [e3] = await page.$x('//*[@id="corePrice_desktop"]/div/table/tbody/tr[2]/td[2]/span[1]/span[2]');
        const src3 = await e3.getProperty('textContent');
        price = await src3.jsonValue();
    } catch (error) {
        try {
            // checks with normal price
            const [e4] = await page.$x('//*[@id="corePrice_desktop"]/div/table/tbody/tr/td[2]/span[1]/span[2]');
            const src4 = await e4.getProperty('textContent');
            price = await src4.jsonValue();
        } catch (error2) {
            price = -1;
        }
    } 

    browser.close();

    return price;
}

// list of products to be added by tim using the website
list_of_products = []

for (let i = 0; i < list_of_products.length - 1; i++) {
    var link = list_of_products[i].getLink();
    var curr_price = list_of_products[i].getPrice;

    if (list_of_products[i].getSoldOut()) {
        if (!scrapeProductSoldOut) {
            // text user that item is not sold out and update the product information
        }
    } else {
        var updated_price = scrapeProductPrice(link);
        if (updated_price == -1) {
            // sold out (idk if we should notify user)
        } else if (updated_price < curr_price) {
            // notify user about discount
        }
    }
}