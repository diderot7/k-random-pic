import React from "react";
import "./App.css";
import Title from "./components/Title";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const Form = ({ updateMainCat }) => {
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(e) {
    const userValue = e.target.value;
    setErrorMessage("");
    if (includesHangul(userValue)) {
      setErrorMessage("한글을 입력할 수 없습니다.");
    }
    setValue(userValue.toUpperCase());
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    if (value === "") {
      setErrorMessage("빈 값은 입력이 불가합니다.");
      return;
    }
    updateMainCat(value);
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="영어 대사를 입력해주세요"
          value={value}
          onChange={handleInputChange}
        />
        <button type="submit">생성</button>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </form>
    </div>
  );
};

function CatItem(props) {
  return (
    <li>
      <img src={props.img} style={{ width: "150px" }} />
    </li>
  );
}
function Favorites({ favorites }) {
  return (
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
  );
}
const MainCard = ({ img, Onheart }) => {
  return (
    <div className="main-card">
      <img src={img} alt="고양이" width="400" />
      <button onClick={Onheart}>🤍</button>
    </div>
  );
};

const App = () => {
  const CAT1 = "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react"; //eslint-disable-line no-unused-vars

  const CAT2 = "https://cataas.com/cat/BxqL2EjFmtxDkAm2/says/inflearn";
  const CAT3 = "https://cataas.com/cat/18MD6byVC1yKGpXp/says/JavaScript"; //eslint-disable-line no-unused-vars

  // const imgArray = [
  //   "emotion1.png",
  //   "emotion2.png",
  //   "emotion3.png",
  //   "emotion4.png",
  //   "emotion5.png",
  // ];

  const [counter, setCounter] = React.useState(
    jsonLocalStorage.getItem("counter") || 1
  );
  const [images, setImages] = React.useState(CAT2);
  const [favorites, setFavorites] = React.useState(
    jsonLocalStorage.getItem("favorites") || []
  );
  async function updateMainCat(value) {
    // const newCat = await fetchCat(value);

    setImages(CAT2);
    const nextCounter = counter + 1;
    setCounter(nextCounter);
    jsonLocalStorage.setItem("counter", nextCounter);
  }
  function Onheart() {
    const nextFavorites = [...favorites, images];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  // fetch("https://dog.ceo/api/breeds/image/random?json=true")
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (myJson) {
  //     console.log(JSON.stringify(myJson));
  //   });

  return (
    <div>
      <Title>{counter}번째 고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={images} Onheart={Onheart} />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
