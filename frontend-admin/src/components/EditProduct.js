import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllCategories,
  getProductById,
  editProduct,
  IMAGE_URL,
} from "../api/apiService";
import MenuItem from "@mui/material/MenuItem";
import { Image } from "react-bootstrap";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  txtInput: {
    width: "98%",
    margin: "10px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditProduct = () => {
  const classes = useStyles();
  const [checkUpdate, setCheckUpdate] = useState(false);
  const { id: idProduct } = useParams();
  const [productName, setProductName] = useState("");
  const [regularPrice, setRegularPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryAll, setCategoryAll] = useState([]);
  const [tagAll, setTagAll] = useState([]);
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();
  const handleResetImages = () => {
    setSelectedImages([]);
    setImageFiles([]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getProductById("products", idProduct);
        console.log(product.data);
        setProductName(product.data.productName);
        setProductDescription(product.data.productDescription);
        setRegularPrice(product.data.regularPrice);
        setDiscountPrice(product.data.discountPrice);
        setCategories(product.data.categories.map((category) => category.id));
        setTags(product.data.tags.map((category) => category.id));
        const categoryData = await getAllCategories("categories");
        setCategoryAll(categoryData.data);
        const tagData = await getAllCategories("tags");
        setTagAll(tagData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idProduct]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/galleries/product/${idProduct}`
        );
        console.log("yyyyyyyyyyyyyyyyyyy");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [idProduct]);
  const handleUploadImages = async (id) => {
    const formData = new FormData();
    imageFiles.forEach((image) => {
      formData.append("files", image);
    });

    try {
      const response = await axios.post(
        `http://localhost:8080/api/galleries/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đặt header Content-Type là multipart/form-data
          },
        }
      );

      console.log("added ga", response);
      if (response.status === 200) {
        setCheckUpdate(true); // Nếu upload thành công, setCheckAdd thành true
      } else {
        alert("Bạn chưa nhập đủ thông tin!"); // Nếu có lỗi, hiển thị thông báo
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi khi upload ảnh!"); // Xử lý khi có lỗi xảy ra trong quá trình upload
    }
  };
  const handleEditProduct = async (event) => {
    event.preventDefault();

    if (
      productName !== "" &&
      productDescription !== "" &&
      regularPrice !== 0 &&
      discountPrice !== 0 &&
      categories.length > 0
    ) {
      const product = {
        productName,
        productDescription,
        regularPrice,
        discountPrice,
        categories: categories.map((c) => ({ id: c })),
        tags: tags.map((c) => ({ id: c })),
      };
      console.log(product);
      try {
        const editedProduct = await editProduct(
          `products/${idProduct}`,
          product
        );
        if (editedProduct.status === 200) {
          if (imageFiles.length > 0) {
            handleUploadImages(editedProduct.data.id);
          } else {
            setCheckUpdate(true);
          }
        } else {
          alert("Bạn chưa nhập đủ thông tin!");
        }
      } catch (error) {
        console.error("Error editing product:", error);
      }
    }
  };

  useEffect(() => {
    if (checkUpdate) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 1000); // Thời gian chờ trước khi chuyển hướng (miliseconds)

      // Xóa timeout khi component unmount hoặc khi checkUpdate thay đổi
      return () => clearTimeout(timeout);
    }
  }, [checkUpdate, navigate]);

  const handleChangeCategories = (event) => {
    const selectedIds = event.target.value;
    console.log(selectedIds);
    setCategories(selectedIds);
  };
  const handleChangeTags = (event) => {
    const selectedIds = event.target.value;
    setTags(selectedIds);
  };
  const handleFileChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    const filesArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        imagesArray.push(reader.result);
        if (imagesArray.length === files.length) {
          setSelectedImages([...selectedImages, ...imagesArray]); // Cập nhật mảng hiển thị hình ảnh
          setImageFiles([...imageFiles, ...filesArray]); // Cập nhật mảng các file hình ảnh
        }
      };

      if (file) {
        reader.readAsDataURL(file);
        filesArray.push(file); // Thêm file vào mảng các file
      }
    }
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Edit Product
            </Typography>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Name
                </Typography>
                <TextField
                  id="title"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                  name="title"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Descripstion
                </Typography>
                <TextField
                  id="productDescription"
                  onChange={(e) => setProductDescription(e.target.value)}
                  value={productDescription}
                  name="productDescription"
                  className={classes.txtInput}
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Regular Price
                </Typography>
                <TextField
                  id="regularPrice"
                  onChange={(e) => setRegularPrice(e.target.value)}
                  value={regularPrice}
                  name="regularPrice"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Discount Price
                </Typography>
                <TextField
                  id="discountPrice"
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  value={discountPrice}
                  name="discountPrice"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Choose Categories
                </Typography>
                <TextField
                  id="categories"
                  name="categories"
                  select
                  value={categories}
                  onChange={handleChangeCategories}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => {
                      const selectedCategories = selected.map((id) => {
                        const category = categoryAll.find(
                          (category) => category.id === id
                        );
                        return category ? category.categoryName : "";
                      });
                      return selectedCategories.join(", ");
                    },
                  }}
                  variant="outlined"
                  className={classes.txtInput}
                >
                  {categoryAll.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Choose Tags
                </Typography>
                <TextField
                  id="tags"
                  name="tags"
                  select
                  value={tags}
                  onChange={handleChangeTags}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => {
                      const selectedCategories = selected.map((id) => {
                        const category = tagAll.find(
                          (category) => category.id === id
                        );
                        return category ? category.name : "";
                      });
                      return selectedCategories.join(", ");
                    },
                  }}
                  variant="outlined"
                  className={classes.txtInput}
                >
                  {tagAll.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="imageInput"
                />
                <label htmlFor="imageInput">
                  <Button component="span"> Images</Button>
                  {/* <Button
                    type="button"
                    onClick={handleResetImages}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    Reset Images
                  </Button> */}
                </label>
                {selectedImages.length === 0
                  ? images.map((image, index) => (
                      <div key={index}>
                        <Image
                          src={IMAGE_URL + image.imagePath}
                          alt={`Selected ${index}`}
                          width={80}
                        />
                      </div>
                    ))
                  : selectedImages.map((image, index) => (
                      <div key={index}>
                        <Image
                          src={image}
                          alt={`Selected ${index}`}
                          width={80}
                        />
                      </div>
                    ))}
              </div>
              <Grid item xs={12} style={{ marginTop: "30px" }}>
                <Button
                  type="button"
                  onClick={handleEditProduct}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Update 
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditProduct;
