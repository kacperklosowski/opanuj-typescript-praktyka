import { readFileSync } from 'fs';

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {boolean} [refurbished]
 */

/**
 * @description Get the product catalog
 * @returns {{products: Product[]}}
 */
export function getProductCatalog() {
  return JSON.parse(readFileSync(new URL('./catalog.json', import.meta.url), 'utf8'));
}
