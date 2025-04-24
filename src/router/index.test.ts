import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Router } from './index';

describe('Router', () => {
  let router: Router;
  let mockRootElement: HTMLElement;
  let mockRoutes: any[];

  beforeEach(() => {
    mockRootElement = document.createElement('div');
    document.body.appendChild(mockRootElement);

    mockRoutes = [
      { path: '/', component: () => document.createElement('div') },
      { path: '/about', component: () => document.createElement('div') },
      {
        path: '/async',
        component: () => Promise.resolve(document.createElement('div')),
      },
    ];

    router = new Router(mockRoutes, mockRootElement);
  });

  afterEach(() => {
    document.body.removeChild(mockRootElement);
  });

  describe('초기화', () => {
    it('라우터가 초기화되어야 한다.', () => {
      expect(router).toBeDefined();
    });

    it('초기 경로에 맞는 컴포넌트가 렌더링되어야 한다', () => {
      expect(mockRootElement.children.length).toBe(1);
    });
  });

  describe('navigation', () => {
    it('navigate 메서드를 호출하면 주어진 경로에 맞는 컴포넌트가 렌더링되어야 한다', () => {
      router.navigate('/about');
      expect(window.location.pathname).toBe('/about');
      expect(mockRootElement.children.length).toBe(1);
    });

    it('링크 클릭 시 preventDefault 메서드가 호출되어야 한다', () => {
      const link = document.createElement('a');
      link.href = '/about';
      document.body.appendChild(link);

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
      link.dispatchEvent(clickEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
      document.body.removeChild(link);
    });
  });

  describe('popstate 이벤트 처리', () => {
    it('popstate 이벤트가 발생하면 주어진 경로에 맞는 컴포넌트가 렌더링되어야 한다', () => {
      window.history.pushState({}, '', '/about');
      window.dispatchEvent(new PopStateEvent('popstate'));

      expect(window.location.pathname).toBe('/about');
      expect(mockRootElement.children.length).toBe(1);
    });
  });

  describe('비동기 컴포넌트 처리', () => {
    it('Promise를 반환하는 컴포넌트가 정상적으로 렌더링되어야 한다', async () => {
      router.navigate('/async');
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(mockRootElement.children.length).toBe(1);
    });
  });
});
