import "./Home.css";
import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../components/navbar/Navbar";
import CardList from "../components/card/CardList";
import ReactPaginate from "react-paginate";
import addFavorites from "../components/favorites/AddFavorites";
import RemoveFavorites from "../components/favorites/RemoveFavorites";
import FilterBar from "../components/filterbar/FilterBar";
import Favorites from "./Favorites";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";

import About from "./About.jsx";
import Resources from "./Resources.jsx";
// import Favorites from "./Favorites.jsx";

// https://api.petfinder.com/v2/animals?type=cat

const { REACT_APP_API_KEY, REACT_APP_SECRET_KEY } = process.env;

const Home = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // page 1 by default
  const [totalPages, setTotalPages] = useState(0);
  // const [totalCats, setTotalCats] = useState(0);
  const [token, setToken] = useState(0);
  const [favorites, setFavorites] = useState([]);
  // new isFiltered array

  // filterbar functions
  const [selectList, setSelectList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [showFilteredCats, setShowFilteredCats] = useState(false);

  const [isFilterOn, setIsFilterOn] = useState(false);

  // client credentials authorization flow is used to obtain an access token to authorize API requests
  const url = `https://api.petfinder.com/v2/animals?type=cat&page=${currentPage}`;

  useEffect(() => {
    // runs whenever component mounts
    console.log("useeffect");
    setLoading(true); // process of fetching

    const catFavorites = localStorage.getItem("react-cat-app-favorites");
    const output = JSON.parse(catFavorites) || [];
    setFavorites(output);

    axios
      .post(
        // get access token
        "https://api.petfinder.com/v2/oauth2/token", // token request, must be POST, contains single parameter and values named grant_type
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
            console.log("links", response.data.pagination._links.next["href"]);
            console.log(response.data);
            setTotalPages(Math.ceil(response.data.pagination.total_pages)); // 4000 something
          })
          .catch((error) => {
            console.log("Failed to get cats.", error);
          });
        // if (isFilterOn) {
        //   console.log("fil is on");
        //   onSelect(selectList, "");
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]); // w/o empty array, infinite fetching loop. [] means it only runs once
  // add dependencies here - call useEffect when something specific changes
  const [data, setData] = useState([]);

  //console.log("f", filteredCats);

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
        // if filters are on
        setCats(response.data.animals); // set cats
        window.scrollTo(0, 0);
      })
      .catch((err) => console.error(err));
  };

  // change page
  const changePage = ({ selected }) => {
    let clickedPage = selected + 1;
    setCurrentPage(clickedPage);
    // setNewPageClick(true);
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

  const onRemove = (selectedList, removedItem) => {
    console.log("remove list", selectedList);
    onSelect(selectedList, removedItem);
    if (selectedList.length === 0) {
      console.log(selectedList, "no filters");
      setIsFilterOn(false);
    }
  };

  const onSelect = (selectedList, selectedItem) => {
    setShowFilteredCats(true);
    setIsFilterOn(true);

    console.log("selected list", selectList, "s item", selectedItem);

    var testarr = [];
    var match = true;

    console.log("on select cats", cats);

    outer: for (var cat of cats) {
      //console.log("cat from onselect", cat);
      inner: for (var i of selectedList) {
        if (Object.values(cat).includes(i["key"]) && i["cat"] !== "Breeds") {
          match = true;
        } else if (i["cat"] === "Breeds") {
          if (Object.values(cat.breeds).includes(i["key"])) {
            match = true;
          } else {
            match = false;
          }
        } else {
          match = false;
          console.log("not a match..");
          break inner;
        }
      }
      if (match) {
        testarr.push(cat);
      }
    }
    console.log("new set cats", testarr);
    // setFilteredCats(testarr);
    setCats(testarr); // set cats to filtered cats
    setSelectList(selectedList);
  };

  const filterCats = (selected) => {
    var filters = selected.map((item, key) => item["key"]);

    const testy = cats.filter(function (item) {
      for (var i in filters) {
        if (!Object.values(item).includes(filters[i])) {
          return false;
        }
        return true; // change so only return true after all categories are checked
      }
    });
    console.log("testy", testy); // filtered list of at least one matching category
  };

  // use cat.map to get cat names
  return (
    <div className="Home">
      <Router>
        <Navbar />
        {/* <Multiselect
          className="multiselect"
          displayValue="key"
          groupBy="cat"
          onKeyPressFn={function noRefCheck() {}}
          onRemove={onRemove}
          onSelect={onSelect}
          options={[
            {
              cat: "Gender",
              key: "Female",
            },
            {
              cat: "Gender",
              key: "Male",
            },
            {
              cat: "Breeds",
              key: "Domestic Short Hair",
            },
            {
              cat: "Breeds",
              key: "Domestic Medium Hair",
            },
            {
              cat: "Breeds",
              key: "Domestic Long Hair",
            },
            {
              cat: "Age",
              key: "Baby",
            },
            {
              cat: "Age",
              key: "Young",
            },
            {
              cat: "Age",
              key: "Adult",
            },
            {
              cat: "Age",
              key: "Senior",
            },
          ]}
          showCheckbox
        /> */}
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                {/* {!showFilteredCats ? (
                  <CardList
                    cats={cats}
                    loading={loading}
                    favorites={addFavorites}
                    handleFavorites={handleFavorites}
                  />
                ) : (
                  <CardList
                    cats={filteredCats}
                    loading={loading}
                    favorites={addFavorites}
                    handleFavorites={handleFavorites}
                  />
                )} */}
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
    </div>
  );
};

export default Home;
