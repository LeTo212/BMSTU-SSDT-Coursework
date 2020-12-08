import React from "react";
import renderer from "react-test-renderer";

import Home from "../../screens/Home";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "../../constants/context";

import * as module from "../../api";

module.getMovies = jest.fn(() => {
  return {
    data: [
      {
        backdrop: "http://localhost:5556/image?MovieID=2&Type=Backdrop",
        description:
          "Готэм, начало 1980-х годов. Комик Артур Флек живет с больной матерью, которая с детства учит его «ходить с улыбкой». Пытаясь нести в мир хорошее и дарить людям радость, Артур сталкивается с человеческой жестокостью и постепенно приходит к выводу, что этот мир получит от него не добрую улыбку, а ухмылку злодея Джокера.",
        directors: ["Тодд  Филлипс"],
        genres: ["Триллер"],
        key: "2",
        poster: "http://localhost:5556/image?MovieID=2&Type=Poster",
        rating: "8.9",
        releaseDate: "2019",
        seasons: [],
        title: "Джокер",
        type: "Фильм",
      },
      {
        backdrop: "http://localhost:5556/image?MovieID=3&Type=Backdrop",
        description:
          "В доме престарелых сильно пожилой мужчина по имени Фрэнк Ширан вспоминает свою жизнь. В 1950-е он работал простым водителем грузовика, совсем не хотел быть гангстером и думал, что маляры - это те, кто красят дома, когда случайно познакомился с криминальным авторитетом Расселом Буфалино. Тот взял парня под своё крыло, начал давать ему небольшие поручения, и вот уже Фрэнк по прозвищу Ирландец сам работает «маляром», мафиозным киллером. Вскоре Рассел сводит его с известным профсоюзным лидером Джимми Хоффой.",
        directors: ["Мартин  Скорсезе"],
        genres: ["Биография", "Драма", "Криминал"],
        key: "3",
        poster: "http://localhost:5556/image?MovieID=3&Type=Poster",
        rating: "8.5",
        releaseDate: "2019",
        seasons: [],
        title: "Ирландец",
        type: "Фильм",
      },
    ],
    statusCode: 200,
  };
});

describe("<Home />", () => {
  const authContext = () => ({
    getToken: () => {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRtcEBtYWlsLnJ1IiwidXNlcklkIjoxLCJpYXQiOjE1MTYyMzkwMjJ9.ivHIia8C6NMHrBY4yI0UfAvxZv6Out56VMLIHgceEns";
    },
    getUser: () => {
      return {
        id: 1,
        email: "tmp",
        firstname: "tmp",
        middlename: "tmp",
        surname: "tmp",
      };
    },
  });

  const home = () =>
    renderer
      .create(
        <AuthContext.Provider value={authContext}>
          <Home />
        </AuthContext.Provider>
      )
      .toJSON();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("Mock Async Storage working", async () => {
    await AsyncStorage.setItem("myKey", "myValue");
    const value = await AsyncStorage.getItem("myKey");
    expect(value).toBe("myValue");
  });

  /*
  test("Renders correctly", () => {
    //getMovies = jest.fn().mockReturnValue([{ key: "1" }, { key: "2" }]);
    //const mock = jest.fn().mockReturnValue("ttrtrt");
    //const getMovies = jest.fn().mockReturnValue([{ key: "1" }, { key: "2" }]);
    //console.log(module.getMovies());
    //console.log(await AsyncStorage.getItem("myKey"));
    //onsole.log(home());
    expect(home).toMatchSnapshot();
  });
  */
});
