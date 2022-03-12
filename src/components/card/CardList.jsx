import React from "react";
import noImage from "../../assets/noImage.png";
import "./CardList.css";

const CardList = ({ cats, loading, favorites, handleFavorites }) => {
  const FavoriteComponent = favorites;
  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="card-container">
      <div className="inner-container">
        {cats.map((c) => (
          <div key={c.id} className="card image-container">
            <div
              onClick={() => handleFavorites(c)}
              className="overlay d=flex align-items-center justify-content"
            >
              <FavoriteComponent />
            </div>
            <img
              className="card-img-top"
              src={
                c && c.primary_photo_cropped
                  ? c.primary_photo_cropped["small"]
                  : noImage
              }
              alt="Cat"
            />
            <div className="card-body">
              <h5 className="card-title">{c.name}</h5>
              <div className="card-text">
                {c.description ? (
                  <p>{c.description}</p>
                ) : (
                  <div>No description available.</div>
                )}
              </div>
              <div className="card-phone">
                {c.contact.phone ? <p>Phone: {c.contact.phone}</p> : null}
              </div>
              <div className="card-email">
                {c.contact.email ? <p>Email: {c.contact.email}</p> : null}
              </div>
              <div className="info-flex-container">
                <div className="gender">
                  <p>{c.gender}</p>
                </div>
                |
                <div className="age">
                  <p>{c.age}</p>
                </div>
                |
                <div className="breed">
                  <p>{c && c.breeds ? c.breeds["primary"] : "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
