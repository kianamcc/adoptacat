// import "./App.css";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import Navbar from "./components/navbar/Navbar";
// import CardList from "./components/card/CardList";
// import ReactPaginate from "react-paginate";
// import AddFavorties from "./components/favorties/AddFavorties";

// // https://api.petfinder.com/v2/animals?type=cat

// const { REACT_APP_API_KEY, REACT_APP_SECRET_KEY } = process.env;

// function App() {
//   const [cats, setCats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1); // page 1 by default
//   const [totalPages, setTotalPages] = useState(0);
//   // const [totalCats, setTotalCats] = useState(0);
//   const [token, setToken] = useState(0);
//   const [favorites, setFavorites] = useState([]);

//   // client credentials authorization flow is used to obtain an access token to authorize API requests
//   const url = `https://api.petfinder.com/v2/animals?type=cat&page=${currentPage}`;

//   useEffect(() => {
//     // runs whenever component mounts
//     console.log("useeffect");
//     setLoading(true); // process of fetching
//     axios
//       .post(
//         // get access token
//         "https://api.petfinder.com/v2/oauth2/token", // token request, must be POST, contains single parameter and values named grant_type
//         `grant_type=client_credentials&client_id=${REACT_APP_API_KEY}&client_secret=${REACT_APP_SECRET_KEY}`
//       )
//       .then((response) => {
//         setToken(response.data.access_token); // new
//         axios
//           .get(url, {
//             // fetch cats
//             headers: { Authorization: `Bearer ${response.data.access_token}` },
//           })
//           .then((response) => {
//             setCats(response.data.animals); // set cats
//             setLoading(false); // data fetching complete
//             console.log("getting cats...", response.data.animals);
//             console.log(response.data);
//             setTotalPages(Math.ceil(response.data.pagination.total_pages)); // 4000 something
//             // setTotalCats(response.data.pagination.total_count);
//           })
//           .catch((error) => {
//             console.log("Failed to get cats.", error);
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []); // w/o empty array, infinite fetching loop. [] means it only runs once
//   // add dependencies here - call useEffect when something specific changes

//   const handleFetch = async (clickedPage) => {
//     setLoading(false); // data fetching complete
//     axios
//       .get(
//         `https://api.petfinder.com/v2/animals?type=cat&page=${clickedPage}`,
//         {
//           // fetch cats
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//       .then((response) => {
//         setCats(response.data.animals); // set cats
//         console.log("new page click data:", response.data);
//         console.log("new page click", response.data.pagination.current_page);
//         window.scrollTo(0, 0);
//       })
//       .catch((err) => console.error(err));
//   };

//   // change page
//   const changePage = ({ selected }) => {
//     console.log("selected", selected);
//     let clickedPage = selected + 1;
//     setCurrentPage(clickedPage);
//     handleFetch(clickedPage);
//   };

//   const handleFavorites = (cat) => {
//     const newFavoritesList = [...favorites, cat]; // copy of current favorites array + new cat
//     setFavorites(newFavoritesList);
//     console.log("cat:", cat, "f list: ", newFavoritesList);
//   };

//   // use cat.map to get cat names
//   return (
//     <div className="App">
//       <Navbar />
//       <CardList
//         cats={cats}
//         loading={loading}
//         favorites={AddFavorties}
//         handleFavorites={handleFavorites}
//       />

//       {/* favorites component
//       favoriteList={favorites}
//       handleFavorites={handleFavorites}
//       favorites={AddFavorties} */}

//       {/* {!loading ? (
//         <ul>
//           {cats.map((c) => (
//             <li key={c.id}>{c.name}</li>
//           ))}
//         </ul>
//       ) : (
//         <div>Loading ...</div>
//       )} */}

//       <ReactPaginate
//         previousLabel={"Previous"}
//         nextLabel={"Next"}
//         breakLabel={"..."}
//         pageCount={totalPages}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={3}
//         onPageChange={changePage}
//         containerClassName={"pagination justify-content-center"}
//         pageClassName={"page-item"}
//         pageLinkClassName={"page-link"}
//         previousClassName={"page-item"}
//         previousLinkClassName={"page-link"}
//         nextClassName={"page-item"}
//         nextLinkClassName={"page-link"}
//         breakClassName={"page-item"}
//         breakLinkClassName={"page-link"}
//         activeClassName={"active"}
//       />
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Resources from "./pages/Resources.jsx";
import Favorites from "./pages/Favorites.jsx";

const App = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
