import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import Pagination from "react-js-pagination";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [isHovered, setIsHovered] = useState(false);
  const [filter, setFilter] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  console.log("bb", products.data.products);
  const [category, setCategory] = useState(null);
  const [material, setMaterial] = useState(null);
  

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAdd = (product) => {
    dispatch(add(product));
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const temp = [];
  products?.data?.products?.map((item) => {
    let data = {
      name: item.name,
      price: item?.price,
      material:
        item.materialId == 2
          ? "COTTON"
          : item.materialId == 3
          ? "LEATHER"
          : item.materialId == 4
          ? "LYCRA"
          : item.materialId == 5
          ? "PLASTIC"
          : "POLYSTER",
      color:
        item.colorId == 2
          ? "BLACK"
          : item.colorId == 3
          ? "RED"
          : item.colorId == 4
          ? "YELLOW"
          : item.colorId == 5
          ? "GREEN"
          : "BLUE",
      image: item.image,
    };
    return temp.push(data);
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const all = temp.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => setFilter(all), [currentPage]);
  useEffect(() => setFilter(all), [products]);
  useEffect(() => {
    const searchFilter = temp.filter((item) => item.color == category);
    setFilter(searchFilter);
  }, [category]);
  useEffect(() => {
    const searchFilter = temp.filter((item) => item.material == material);
    setFilter(searchFilter);
  }, [material]);

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="grid-filter ">
        <div>
          <h2>Filter</h2>
          <h4>
            {" "}
            <button
              onClick={() => {
                setFilter(all);
              }}
            >
              All
            </button>
          </h4>
          <ul className="filter-btn">
            <h4>Material</h4>
            <li>
              {" "}
              <button
                onClick={() => {
                  setFilter(all);
                }}
              >
                All
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setCategory(null);
                  setMaterial("PLASTIC");
                }}
              >
                plastic
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCategory(null);
                  setMaterial("COTTON");
                }}
              >
                COTTON
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCategory(null);
                  setMaterial("LYCRA");
                }}
              >
                LYCRA
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCategory(null);
                  setMaterial("LEATHER");
                }}
              >
                LEATHER
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCategory(null);
                  setMaterial("POLYSTER");
                }}
              >
                POLYSTER
              </button>
            </li>
            <h4>color</h4>
            <li>
              {" "}
              <button
                onClick={() => {
                  setFilter(all);
                }}
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setMaterial(null);
                  setCategory("BLACK");
                }}
              >
                black
              </button>
            </li>
            <li>
              {" "}
              <button
                onClick={() => {
                  setMaterial(null);

                  setCategory("GREEN");
                }}
              >
                green
              </button>
            </li>

            <li>
              {" "}
              <button
                onClick={() => {
                  setMaterial(null);

                  setCategory("YELLOW");
                }}
              >
                Yellow
              </button>
            </li>
            <li>
              {" "}
              <button
                onClick={() => {
                  setMaterial(null);

                  setCategory("RED");
                }}
              >
                Red
              </button>
            </li>
          </ul>
        </div>
        <div className="productsWrappers">
          {filter?.map((product) => (
            <div className="cards product" key={product.id}    onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
              <img
                className="imgs"
                src={product.image}
                alt="Product Thumbnail"
             
              />{" "}
              {isHovered && (
                <button onClick={() => handleAdd(product)} className="btnn">
                  Add To Cart
                </button>
              )}
              <h4>{product.name}</h4>
              <h4>{product.color}</h4>
              <h4>{product.material}</h4>
              <h5>{`INR ${product.price}.00`}</h5>
            </div>
          ))}
        </div>{" "}
      </div>
      <div className="pagination-background">
        <Pagination
          activePage={all}
          itemsCountPerPage={postsPerPage}
          totalItemsCount={temp.length}
          pageRangeDisplayed={Math.ceil(temp.length / postsPerPage)}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
      <div></div>
    </>
  );
};

export default Products;
