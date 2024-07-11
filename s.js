
import express from "express";
import axios from 'axios';
import puppeteer from 'puppeteer';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors()); 
const PORT = 3002;
app.get('/',async(req,res)=>{
  res.send(':-=)')
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
  