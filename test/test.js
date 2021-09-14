import assert from 'assert';
import calculator from'../src/calculator.js';

describe('Calculator test...', function() {
  it('should return correct sum', function() {
    const a = Math.random() * 1000;
    const b = Math.random() * 1000;
    assert.equal(calculator.getResults(`${a} + ${b}`), a + b);
  });
  it('should return correct subtraction', function() {
    const a = Math.random() * 1000;
    const b = Math.random() * 1000;
    assert.equal(calculator.getResults(`${a} - ${b}`), a - b);
  });
  it('should return correct multiplication', function() {
    const a = Math.random() * 1000;
    const b = Math.random() * 1000;
    assert.equal(calculator.getResults(`${a} * ${b}`), a * b);
  });
  it('should return correct division', function() {
    const a = Math.random() * 1000;
    const b = Math.random() * 1000;
    assert.equal(calculator.getResults(`${a} / ${b}`), a / b);
  });
  it('should return correct result of composite equation', function() {
    const a = Math.random() * 1000;
    const b = Math.random() * 1000;
    const c = Math.random() * 1000;
    const d = Math.random() * 1000;
    const e = Math.random() * 1000;
    assert.equal(
        calculator.getResults(`${a} + (${b} / ${c}) * ${d} - ${e}`),
        a + b / c * d -e
    );
  });
});