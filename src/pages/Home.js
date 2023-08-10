import React from "react";
import Products from "../components/Products";

const Home = () => {
  return (
    <div className="header2">
      <div className="grid-filter">
        <div>
        </div>
        <section>
          <h3 style={{ textAlign: "center" }}>Products</h3>
          <Products />
        </section>
      </div>

      <footer className="footer"></footer>

    </div>
  );
};

export default Home;
