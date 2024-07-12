
import express from "express";
import axios from 'axios';
import puppeteer from 'puppeteer';
import cors from 'cors';
const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const PORT = 3002;
app.get('/',async(req,res)=>{

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.serializd.com/show/Kaiju-No.-8-207468');

  const screenshotBuffer = await page.screenshot();

  res.set('Content-Type', 'image/png');
  res.status(200).send(screenshotBuffer);
  await browser.close()
})
app.get("/getall", async (req, res) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.serializd.com/show/Kaiju-No.-8-207468');
  await page.waitForSelector('.col-md-12.col-12');
  const t = await page.$$eval('.col-md-12.col-12 > div > div', elements => {
    return elements.map(element => element.textContent);
  });
  var arr = []
  for (let i = 0; i<t.length; i++){
    if (t[i].includes('2024')){
    arr.push(`"${t[i].split('2024')[1]}"`)
    }
    else{
      continue
    }
    
  }
  res.status(200).json(arr);
  await browser.close()
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  