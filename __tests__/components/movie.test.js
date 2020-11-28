import React from "react";
import renderer from "react-test-renderer";

import Movie from "../../components/Movie";

/*
describe("<Movie />", () => {
  const noteNode = () =>
    renderer
      .create(
        <Provider store={store}>
          <Note note={note} />
        </Provider>
      )
      .toJSON();

  beforeEach(() => {});

  afterEach(() => {});

  it("has 1 Text child", () => {
    const minutesNote = noteNode({ title: "50-60 мин." });
    const moneyNote = noteNode({ title: "от 400 р." });
    expect(minutesNote.children[0].type).toBe("Text");
    expect(moneyNote.children[0].type).toBe("Text");
  });

  it("has onClick function", () => {
    const tree = noteNode({ title: "Пицца" });
    expect(tree.children[0].props.onClick).toBeDefined();
  });
});
*/
