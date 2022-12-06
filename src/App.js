import React from 'react';
import './index.scss';
import { Collection } from "./components/Collection";
import Skeleton from './components/Skeleton';

function App() {
  const [collection, setCollection] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const category = categoryId ? `category=${categoryId}` : "";
    setIsLoading(true);
    fetch(`https://638ebbfd9cbdb0dbe31377e5.mockapi.io/photos?page=${page}&limit=3&${category}`)
      .then(res => res.json())
      .then(json => setCollection(json))
      .catch(err => {
        console.warn(err);
        alert("Произошла ошибка при получении данных")
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ];
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((cat, i) => <li
            key={cat.name}
            className={categoryId === i ? "active" : ""}
            onClick={() => setCategoryId(i)}
          >{cat.name}</li>)}
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>

        ) : (
          collection.filter(item => (
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )).map((item, index) => (
            <Collection
              key={index}
              name={item.name}
              images={item.photos}
            />
          ))
        )}


      </div>
      <ul className="pagination">
        {[...Array(3)].map((item, i) => (
          <li
            key={i}
            className={page === (i + 1) ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >{i + 1}</li>))}
      </ul>
    </div>
  );
}

export default App;
