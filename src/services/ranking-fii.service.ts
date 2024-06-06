import { Injectable } from '@nestjs/common';
import { RankingFIIModel } from 'src/models/ranking-fii.model';
import puppeteer from 'puppeteer';

const url = `https://www.fundsexplorer.com.br/ranking`;

@Injectable()
export class RakingFIIService {
  constructor() {}

  async findAll(): Promise<RankingFIIModel[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.content();

      const rowsMap = await page.evaluate(() => {
        const table: HTMLTableElement = document.querySelector('table');

        const header: HTMLTableCellElement[] = Array.from(
          table
            .getElementsByTagName('thead')[0]
            .getElementsByTagName('tr')[0]
            .getElementsByTagName('th'),
        );

        const rows: HTMLTableRowElement[] = Array.from(
          table.getElementsByTagName('tbody')[0].getElementsByTagName('tr'),
        );

        const keysHeader = header.map((th) => th.getAttribute('name'));

        const rowsMap = rows.map((row) => {
          const cells = Array.from(row.getElementsByTagName('td'));
          const rowObj: any = {};

          cells.forEach((cell, index) => {
            const key = keysHeader[index];
            rowObj[key] = cell.textContent;
          });

          return rowObj;
        });

        return rowsMap;
      });

      return rowsMap;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      return [];
    } finally {
      await browser.close();
    }
  }
}
