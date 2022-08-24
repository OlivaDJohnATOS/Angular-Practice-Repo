import { ReversePipe } from './reverse.pipe';


describe('Component: User', () => {
  it('should do something', () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform('hello')).toEqual('olleh')
  })
});
