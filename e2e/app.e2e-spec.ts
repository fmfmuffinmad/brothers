import { BrothersPage } from './app.po';

describe('brothers App', () => {
  let page: BrothersPage;

  beforeEach(() => {
    page = new BrothersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
