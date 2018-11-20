const { expect } = require('chai');

const cache = require('./');

describe('cache', () => {
  before(async () => {
    await cache.delete('ronaldo');
    // .then(() => done())
    // .catch(done);
  });
  it('should set an object into cache', async () => {
    const ronaldo = { name: { first: 'Ronaldo', last: 'Nazário' } };
    const OK = await cache.set({ key: 'ronaldo', data: ronaldo });
    expect(OK).to.be.equal('OK');
  });
  it('should get ronaldo from cache', async () => {
    const ronaldo = { name: { first: 'Ronaldo', last: 'Nazário' } };
    const storedRonaldo = await cache.get('ronaldo');
    expect(storedRonaldo).to.deep.equal(ronaldo);
  });
  it('should get null from cache', async () => {
    const stored = await cache.get('alskdjasd');
    expect(stored).to.be.null;
  });
  it('should delete ronaldo from cache', async () => {
    const ronaldo = { name: { first: 'Ronaldo', last: 'Nazário' } };
    await cache.set({ key: 'ronaldo', data: ronaldo });

    await cache.delete('ronaldo');

    const exists = await cache.exists('ronaldo');

    expect(exists).to.be.false;
  });
});
