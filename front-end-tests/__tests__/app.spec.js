// TODO: to review - what are we testing here - app.js or initializer.applyConfigurations
import Initializer from '../../src/initializer/initializer';

describe('Bingo App', () => {
  test('Should initialize the game via Game Initializer', () => {
    expect(Initializer.applyConfigurations).to.be.called;
  });
});
