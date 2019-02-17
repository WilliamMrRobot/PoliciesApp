import { LogoutPageModule } from './logout-page.module';

describe('LogoutPageModule', () => {
  let logoutPageModule: LogoutPageModule;

  beforeEach(() => {
    logoutPageModule = new LogoutPageModule();
  });

  it('should create an instance', () => {
    expect(logoutPageModule).toBeTruthy();
  });
});
