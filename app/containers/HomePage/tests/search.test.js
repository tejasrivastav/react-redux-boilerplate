import { search } from "../services/search";
describe("Search", () => {
  let posts = [];
  beforeEach(() => {
    posts = [
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat providentqui occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "qui est esse qui",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      }
    ]
  });

  it("fucnction invoked", () => {
    let result = search(posts, "qui");
    expect([["qui"]]).toEqual(result);
  });
});
