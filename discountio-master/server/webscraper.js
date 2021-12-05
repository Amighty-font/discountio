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

// var normal = new Product("https://www.amazon.ca/Amazon-Ethernet-Adapter-Fire-Devices/dp/B01LXP5TXI/ref=p13n_ds_purchase_sim_1p_dp_desktop_1/141-2361534-6361661?pd_rd_w=NHonj&pf_rd_p=b320fab9-b132-4bb6-a1bd-e1a1eb3bd47e&pf_rd_r=8T9AWGCAZXHAWYJJQFWV&pd_rd_r=4be29f59-7e1e-4ed7-9deb-eb4b0dcc1b84&pd_rd_wg=EWiKv&pd_rd_i=B01LXP5TXI&psc=1",
//                         "19.99",
//                         0,
//                         0,
//                         0);
// var sold_out_product = new Product("https://www.amazon.ca/Made-Canada-level-Black-Mask/dp/B0924YB4L5/ref=sr_1_131?keywords=face+mask&qid=1638659654&refinements=p_n_availability%3A12035748011&rnid=12035746011&sr=8-131",
//                                     "0",
//                                     1,
//                                     0,
//                                     0);
// var not_sold_out_anymore = new Product("https://www.amazon.ca/Amazon-Ethernet-Adapter-Fire-Devices/dp/B01LXP5TXI/ref=p13n_ds_purchase_sim_1p_dp_desktop_1/141-2361534-6361661?pd_rd_w=NHonj&pf_rd_p=b320fab9-b132-4bb6-a1bd-e1a1eb3bd47e&pf_rd_r=8T9AWGCAZXHAWYJJQFWV&pd_rd_r=4be29f59-7e1e-4ed7-9deb-eb4b0dcc1b84&pd_rd_wg=EWiKv&pd_rd_i=B01LXP5TXI&psc=1",
//                                         "0",
//                                         1,
//                                         0,
//                                         0);
// var notify_sale = new Product("https://www.amazon.ca/fire-tv-stick-with-3rd-gen-alexa-voice-remote/dp/B08C1TR9X6?ref_=Oct_d_obs_d_667823011&pd_rd_w=qrVzL&pf_rd_p=886d55ac-d17c-4912-a5af-948a0d840eec&pf_rd_r=AZJFJEQENB51SZDE6BDX&pd_rd_r=0dec4ba1-a834-40ec-a247-deca17d97058&pd_rd_wg=a4hGC&pd_rd_i=B08C1TR9X6",
//                               "59.99",
//                               0,
//                               0,
//                               0);

// var list_of_products = [normal, sold_out_product, not_sold_out_anymore, notify_sale, list_of_products];


// for (let i = 0; i < list_of_products.length - 1; i++) {
//     var link = list_of_products[i].getLink();
//     var curr_price = list_of_products[i].getPrice;

//     if (list_of_products[i].getSoldOut()) {
//         if(!scrapeProductSoldOut(link)) {
//             list_of_products[i].setSoldOut(0);
//             list_of_products[i].setPrice(scrapeProductPrice(link));
//             list_of_products[i].setRestocked(1);
//         }
//     } else {
//         var updated_price = scrapeProductPrice(link);
//         if (updated_price == -1) {
//             list_of_products[i].setPrice(0);
//             list_of_products[i].setSoldOut(1);
//         } else if (updated_price < curr_price) {
//             list_of_products[i].setPrice(updated_price);
//             list_of_products[i].setOnSale(1);
//         }
//     }

// }


// normal
// scrapeProduct('https://www.amazon.ca/Amazon-Ethernet-Adapter-Fire-Devices/dp/B01LXP5TXI/ref=p13n_ds_purchase_sim_1p_dp_desktop_1/141-2361534-6361661?pd_rd_w=NHonj&pf_rd_p=b320fab9-b132-4bb6-a1bd-e1a1eb3bd47e&pf_rd_r=8T9AWGCAZXHAWYJJQFWV&pd_rd_r=4be29f59-7e1e-4ed7-9deb-eb4b0dcc1b84&pd_rd_wg=EWiKv&pd_rd_i=B01LXP5TXI&psc=1');

// deal
// scrapeProduct('https://www.amazon.ca/fire-tv-stick-with-3rd-gen-alexa-voice-remote/dp/B08C1TR9X6?ref_=Oct_d_obs_d_667823011&pd_rd_w=qrVzL&pf_rd_p=886d55ac-d17c-4912-a5af-948a0d840eec&pf_rd_r=AZJFJEQENB51SZDE6BDX&pd_rd_r=0dec4ba1-a834-40ec-a247-deca17d97058&pd_rd_wg=a4hGC&pd_rd_i=B08C1TR9X6');
// scrapeProduct('https://www.amazon.ca/Rechargeable-Operated-Electric-Motorcycle-S66B/dp/B08GSTR85G?ref_=Oct_DLandingS_D_352714a7_60&smid=AQPJ60TYAP2UO&th=1&psc=1')

// unavailable
// scrapeProduct('https://www.amazon.ca/Made-Canada-level-Black-Mask/dp/B0924YB4L5/ref=sr_1_131?keywords=face+mask&qid=1638659654&refinements=p_n_availability%3A12035748011&rnid=12035746011&sr=8-131')