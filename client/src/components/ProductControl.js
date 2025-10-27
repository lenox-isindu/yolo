import React, { Component } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import NewProductForm from './NewProductForm';
import ProductDetail from './ProductDetail';
import AddProduct from './AddProduct';
import EditProductForm from './EditProductForm';

// ✅ Smart API base URL handling
const API_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000/api" // for when you're running frontend from your host browser
    : "http://backend_cont:5000/api"; // for when frontend runs inside Docker container (same network)

class ProductControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      actualProductList: [],
      selectedProduct: null,
      editProduct: false,
      uploadPhoto: null,
    };
  }

  // ✅ Fetch all products on load
  componentDidMount() {
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        console.log('Fetched products:', res.data);
        this.setState({
          actualProductList: res.data,
        });
      })
      .catch((err) => console.error('❌ Error fetching products:', err));
  }

  handleEditProductClick = () => {
    this.setState({ editProduct: true });
  };

  handleAddButtonClick = (id) => {
    const BuyProduct = this.state.actualProductList.find(
      (product) => product._id === id
    );
    if (BuyProduct) {
      BuyProduct.quantity = BuyProduct.quantity - 1;
      if (BuyProduct.quantity <= 0) {
        BuyProduct.quantity = 'Product is not Available';
      }
      this.setState({ selectedProduct: BuyProduct });
    }
  };

  handleClick = () => {
    if (this.state.editProduct) {
      this.setState({ editProduct: false });
    } else if (this.state.selectedProduct != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedProduct: null,
      });
    } else {
      this.setState((prevState) => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  };

  // ✅ Add a new product
  handleAddingNewProduct = (newProduct) => {
    axios
      .post(`${API_URL}/products`, newProduct)
      .then((res) => {
        console.log('✅ Product added:', res.data);
        this.setState({
          formVisibleOnPage: false,
        });
      })
      .catch((err) => console.error('❌ Error adding product:', err));
  };

  // ✅ Delete a product
  handleDeletingProduct = (id) => {
    axios
      .delete(`${API_URL}/products/${id}`)
      .then((res) => {
        console.log('🗑️ Product deleted:', res.data);
        this.setState({
          actualProductList: this.state.actualProductList.filter(
            (product) => product._id !== id
          ),
          formVisibleOnPage: false,
          selectedProduct: null,
        });
      })
      .catch((err) => console.error('❌ Error deleting product:', err));
  };

  // ✅ Select product for detail view
  handleChangingSelectedProduct = (id) => {
    const selectedProduct = this.state.actualProductList.find(
      (product) => product._id === id
    );
    if (selectedProduct) {
      this.setState({ selectedProduct });
    }
  };

  // ✅ Edit a product
  handleEditingProduct = (editedProduct) => {
    const id = this.state.selectedProduct?._id;
    if (!id) return;

    axios
      .put(`${API_URL}/products/${id}`, editedProduct)
      .then((res) => {
        console.log('✏️ Product updated:', res.data);
        this.setState({
          editProduct: false,
          formVisibleOnPage: false,
        });
        window.location = '/';
      })
      .catch((err) => console.error('❌ Error editing product:', err));
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editProduct) {
      currentlyVisibleState = (
        <EditProductForm
          product={this.state.selectedProduct}
          onEditProduct={this.handleEditingProduct}
        />
      );
      buttonText = 'Back to Product Detail';
    } else if (this.state.selectedProduct != null) {
      currentlyVisibleState = (
        <ProductDetail
          product={this.state.selectedProduct}
          onBuyButtonClick={this.handleAddButtonClick}
          onDeleteProduct={this.handleDeletingProduct}
          onEditProductClick={this.handleEditProductClick}
        />
      );
      buttonText = 'Back to Product List';
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewProductForm onNewProductCreation={this.handleAddingNewProduct} />
      );
      buttonText = 'Back to Product List';
    } else {
      currentlyVisibleState = (
        <ProductList
          productList={this.state.actualProductList}
          onProductSelection={this.handleChangingSelectedProduct}
        />
      );
      buttonText = 'Add a Product';
    }

    return (
      <React.Fragment>
        <AddProduct buttonText={buttonText} whenButtonClicked={this.handleClick} />
        {currentlyVisibleState}
      </React.Fragment>
    );
  }
}

export default ProductControl;
