import "./Home.css";
import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../components/navbar/Navbar";
import CardList from "../components/card/CardList";
import ReactPaginate from "react-paginate";
import addFavorites from "../components/favorites/AddFavorites";
import RemoveFavorites from "../components/favorites/RemoveFavorites";
import Favorites from "./Favorites";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import About from "./About.jsx";
import Resources from "./Resources.jsx";
// import Favorites from "./Favorites.jsx";

// https://api.petfinder.com/v2/animals?type=cat

const { REACT_APP_API_KEY, REACT_APP_SECRET_KEY } = process.env;

// export const userContext = createContext([]); // new

const Home = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // page 1 by default
  const [totalPages, setTotalPages] = useState(0);
  // const [totalCats, setTotalCats] = useState(0);
  const [token, setToken] = useState(0);
  const [favorites, setFavorites] = useState([]);

  // client credentials authorization flow is used to obtain an access token to authorize API requests
  const url = `https://api.petfinder.com/v2/animals?type=cat&page=${currentPage}`;

  useEffect(() => {
    // runs whenever component mounts
    console.log("useeffect");
    setLoading(true); // process of fetching

    // NEW
    const catFavorites = localStorage.getItem("react-cat-app-favorites");
    const output = JSON.parse(catFavorites) || [];
    setFavorites(output);

    axios
      .post(
        // get access token
        "http://api.petfinder.com/v2/oauth2/token", // token request, must be POST, contains single parameter and values named grant_type
        `grant_type=client_credentials&client_id=${REACT_APP_API_KEY}&client_secret=${REACT_APP_SECRET_KEY}`
      )
      .then((response) => {
        setToken(response.data.access_token); // new
        axios
          .get(url, {
            // fetch cats
            headers: { Authorization: `Bearer ${response.data.access_token}` },
          })
          .then((response) => {
            setCats(response.data.animals); // set cats
            setLoading(false); // data fetching complete
            console.log("getting cats...", response.data.animals);
            console.log(response.data);
            setTotalPages(Math.ceil(response.data.pagination.total_pages)); // 4000 something
            // setTotalCats(response.data.pagination.total_count);
          })
          .catch((error) => {
            console.log("Failed to get cats.", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]); // w/o empty array, infinite fetching loop. [] means it only runs once
  // add dependencies here - call useEffect when something specific changes

  const handleFetch = async (clickedPage) => {
    setLoading(false); // data fetching complete
    axios
      .get(
        `https://api.petfinder.com/v2/animals?type=cat&page=${clickedPage}`,
        {
          // fetch cats
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setCats(response.data.animals); // set cats
        // console.log("new page click data:", response.data);
        // console.log("new page click", response.data.pagination.current_page);
        window.scrollTo(0, 0);
      })
      .catch((err) => console.error(err));
  };

  // change page
  const changePage = ({ selected }) => {
    let clickedPage = selected + 1;
    setCurrentPage(clickedPage);
    handleFetch(clickedPage);
  };

  const handleFavorites = (cat) => {
    const filterList = favorites.filter((favorite) => favorite.id !== cat.id);
    console.log("filteredList", [...filterList, cat]);
    const newFavoritesList = [...filterList, cat];

    setFavorites(newFavoritesList);
    saveToLocalStorage(newFavoritesList); // save to local storage
  };

  const handleRemove = (cat) => {
    const newFavoritesList = favorites.filter(
      (favorite) => favorite.id !== cat.id
    );
    setFavorites(newFavoritesList);
    saveToLocalStorage(newFavoritesList); // save to local storage
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-cat-app-favorites", JSON.stringify(items));
  };

  // use cat.map to get cat names
  return (
    <div className="Home">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <CardList
                  cats={cats}
                  loading={loading}
                  favorites={addFavorites}
                  handleFavorites={handleFavorites}
                />

                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={changePage}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </Fragment>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route
            path="/favorites"
            element={
              <Favorites
                handleFavorites={handleRemove}
                removeFavoritesComponent={RemoveFavorites}
                cats={favorites}
              />
            }
          />
        </Routes>
      </Router>

      {/* <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={changePage}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      /> */}
    </div>
  );
};

export default Home;
