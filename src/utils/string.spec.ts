import { getNextCharacter } from './string';

describe('[HAPPY_CASE] getNextCharacter', () => {
  it('A should B', () => {
    expect(getNextCharacter('A')).toEqual('B');
  });
  it('C should D', () => {
    expect(getNextCharacter('C')).toEqual('D');
  });

  it('AA should AB', () => {
    expect(getNextCharacter('AA')).toEqual('AB');
  });

  it('AD should AE', () => {
    expect(getNextCharacter('AD')).toEqual('AE');
  });

  it('ABC should ABD', () => {
    expect(getNextCharacter('ABC')).toEqual('ABD');
  });

  it('ZZC should ZZD', () => {
    expect(getNextCharacter('ZZC')).toEqual('ZZD');
  });

  it('1 should 2', () => {
    expect(getNextCharacter('1')).toEqual('2');
  });

  it('11 should 12', () => {
    expect(getNextCharacter('11')).toEqual('12');
  });

  it('87 should 88', () => {
    expect(getNextCharacter('87')).toEqual('88');
  });

  it('185 should 186', () => {
    expect(getNextCharacter('185')).toEqual('186');
  });
});
