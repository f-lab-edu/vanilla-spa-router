import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Product } from '../types/product';
import { fetchProducts } from './products';

describe('products API', () => {
  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  it('상품 목록을 가져오는데 성공한다', async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: '테스트 상품 1',
        price: 10000,
        image: '테스트 이미지 1',
      },
      {
        id: 2,
        name: '테스트 상품 2',
        price: 20000,
        image: '테스트 이미지 2',
      },
    ];

    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const products = await fetchProducts();

    expect(products).toEqual(mockProducts);
    expect(window.fetch).toHaveBeenCalledWith('/api/products');
  });

  it('상품 목록을 가져오는데 실패한다', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    await expect(fetchProducts()).rejects.toThrow('Failed to fetch products');
  });
});
