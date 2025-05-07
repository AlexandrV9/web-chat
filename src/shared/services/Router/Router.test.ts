import { Router } from '.';
import { Block } from '..';

class MainPage extends Block {}
class ProfilePage extends Block {}
class SettingsPage extends Block {}

describe('Router', () => {
  const router = new Router('.app');

  router.setPublicPathnames(['/']).use('/', MainPage).use('/profile', ProfilePage).use('/settings', SettingsPage).start();

  router.start();

  it('change route', () => {
    router.goByPathname('/');
    router.goByPathname('/about');

    expect(router.history?.length).toEqual(3);
  });

  it('get current pathname', () => {
    router.goByPathname('/settings');

    const route = router.getCurrentRoute();

    expect(route?.getPathname()).toEqual('/settings');
  });

  it('check goToPrevPage', () => {
    router.goByPathname('/settings');
    router.goByPathname('/about');
    router.goToPrevPage();

    const route = router.getCurrentRoute();

    expect(route?.getPathname()).toBe('/settings');
  });

  it('check goToNextPage', () => {
    router.goByPathname('/settings');
    router.goByPathname('/about');
    router.goByPathname('/');

    router.goToPrevPage();
    router.goToNextPage();

    const route = router.getCurrentRoute();

    expect(route?.getPathname()).toBe('/');
  });
});
