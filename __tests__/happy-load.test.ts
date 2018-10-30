import * as happyLoad from "../src/index";

describe("happy-load", () => {
  test("all() should return contents of data.all", () => {
    expect(happyLoad.all()).toEqual(happyLoad.data.all);
  });

  test("all(source) should return all messages for a source", () => {
    const bti = happyLoad.data.all.filter((m) => m.source === "beneaththeink");
    const result = happyLoad.all("beneaththeink");

    for (const m of bti) {
      expect(result).toContainEqual(m);
    }
  });

  test("get(index) should return the message at a specfic index", () => {
    expect(happyLoad.get(2)).toEqual(happyLoad.data.all[2]);
  });

  test("get(id) should return the message by id", () => {
    const msg = happyLoad.data.all.find((m) => m.id === "beneaththeink/robot");
    expect(happyLoad.get("beneaththeink/robot")).toEqual(msg);
  });

  test("random() should return some random message", () => {
    expect(happyLoad.data.all).toContainEqual(happyLoad.random());
  });

  test("random(source) should return some random message by source", () => {
    const bti = happyLoad.data.all.filter((m) => m.source === "beneaththeink");
    expect(bti).toContainEqual(happyLoad.random("beneaththeink"));
  });
});
