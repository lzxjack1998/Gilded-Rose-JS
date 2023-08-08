const { Shop, Item } = require('../src/gilded_rose');

describe('Gilded Rose', () => {
  it('should properly update normal item', () => {
    const shop = new Shop([new Item('normal', 10, 20)]);
    const items = shop.updateQuality();
    expect(items[0].name).toEqual('normal');
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(19);
  });

  it('should properly decrease quality twice as fast for normal item after sellIn passed', () => {
    const shop = new Shop([new Item('normal', 0, 20)]);
    const items = shop.updateQuality();
    expect(items[0].name).toEqual('normal');
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(18);
  });

  it('should not have negative quality for normal item', () => {
    const shop = new Shop([new Item('normal', 0, 0)]);
    const items = shop.updateQuality();
    expect(items[0].name).toEqual('normal');
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });

  it('should properly update Aged Brie item', () => {
    const shop = new Shop([new Item('Aged Brie', 10, 20)]);
    const items = shop.updateQuality();
    expect(items[0].name).toEqual('Aged Brie');
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(21);
  });

  it('should properly update Aged Brie item after sellIn passed', () => {
    const shop = new Shop([new Item('Aged Brie', 0, 20)]);
    const items = shop.updateQuality();
    expect(items[0].name).toEqual('Aged Brie');
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(22);
  });

  it('should properly update Backstage passes item with more than 10 days to concert', () => {
    const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20)]);
    const items = shop.updateQuality();
    expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toEqual(10);
    expect(items[0].quality).toEqual(21);
  });

  it('should properly update Backstage passes item with 10 days or less to concert', () => {
    const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
    const items = shop.updateQuality();
    expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(22);
  });

  it('should properly update Backstage passes item with 5 days or less to concert', () => {
    const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
    const items = shop.updateQuality();
    expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toEqual(4);
    expect(items[0].quality).toEqual(23);
  });

  it('should properly update Backstage passes item after concert', () => {
    const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
    const items = shop.updateQuality();
    expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });

  it('should not change Sulfuras item', () => {
    const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const items = shop.updateQuality();
    expect(items[0].name).toEqual('Sulfuras, Hand of Ragnaros');
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(80);
  });

  it('should not allow quality more than 50', () => {
    const shop = new Shop([
      new Item('Aged Brie', 10, 50),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 50)
    ]);
    const items = shop.updateQuality();
    expect(items[0].name).toEqual('Aged Brie');
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(50);
    expect(items[1].name).toEqual('Backstage passes to a TAFKAL80ETC concert');
    expect(items[1].sellIn).toEqual(4);
    expect(items[1].quality).toEqual(50);
  });
});
