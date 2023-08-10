import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/cartSlice";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const Navbar = () => {
    const navigate = useNavigate()
  const items = useSelector((state) => state.cart);

  const [topRightModal, setTopRightModal] = useState(false);

  const toggleShow = () => setTopRightModal(!topRightModal);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };
  const productHandle =()=>{
    navigate("/")

  }
  return (
    <>
      <div className="header">
        <div className="navbar">
          <img className="logo" src="\Images\RIGHTFIT.COM (1).png" />
          <div className="nav">
            <Link className="navLink" to="/">
              All Products
            </Link>
            <Link className="navLink" to="/">
              Feture Products
            </Link>
            <Link   className="navLink" to="/">
              <img  onClick={toggleShow} src="\Images\mdi_cart-outline.svg" />
            </Link>
            <span className="cartCount"> {items.length}</span>
          </div>
        </div>
      </div>
      <MDBModal
        animationDirection="right"
        show={topRightModal}
        tabIndex="-1"
        setShow={setTopRightModal}
      >
        <MDBModalDialog position="top-right" side>
          <MDBModalContent>
            <MDBModalHeader className="bg-info text-white">
              <MDBModalTitle>Shopping Cart</MDBModalTitle>
              <MDBBtn
                color="none"
                className="btn-close btn-close-white"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              {products.map((product) => (
                <div className="row">
                  {" "}
                  <hr />
                  <div className="col-3 text-center">
                    <img className="cart-img" src={product.image} alt="" />
                  </div>
                  <div className="col-8 cart-details">
                    <h4>{product.name}</h4>
                    <h4>
                      {product.colorId == 2
                        ? "BlACK"
                        : product.colorId == 3
                        ? "RED"
                        : product.colorId == 4
                        ? "YELLOW"
                        : product.colorId == 5
                        ? "GREEN"
                        : "BLUE"}
                    </h4>
                    <h4>
                      {product.materialId == 2
                        ? "COTTON"
                        : product.materialId == 3
                        ? "LEATHER"
                        : product.materialId == 4
                        ? "LYCRA"
                        : product.materialId == 5
                        ? "PLASTIC"
                        : "POLYSTER"}
                    </h4>
                    <h5>{`INR ${product.price}.00`}</h5>
                    <MDBBtn
                      
                      color="dark"
                      onClick={() => handleRemove(product.name)}
                    >
                      Remove X
                    </MDBBtn>
                  </div>
                </div>
              ))}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn onClick={productHandle} color="info">Go to the Product</MDBBtn>
              <MDBBtn outline color="info" onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Navbar;
