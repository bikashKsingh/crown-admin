import { Routes, Route } from "react-router-dom";
import * as Pages from "../../pages";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/login" element={<Pages.Login />} />
      <Route path="/forgot-password" element={<Pages.ForgotPassword />} />
      <Route path="/verify-otp" element={<Pages.VerifyOtp />} />
      <Route
        path="/create-new-password"
        element={<Pages.CreateNewPassword />}
      />

      {/* Category */}
      <Route path="/categories/add" element={<Pages.AddCategory />} />
      <Route path="/categories/edit/:id" element={<Pages.EditCategory />} />
      <Route path="/categories" element={<Pages.CategoryList />} />

      {/* Carousel */}
      <Route path="/carousels/add" element={<Pages.AddCarousel />} />
      <Route path="/carousels/edit/:id" element={<Pages.EditCarousel />} />
      <Route path="/carousels" element={<Pages.CarouselList />} />

      {/* Homepage */}
      <Route path="/homepage" element={<Pages.HomepageContent />} />

      {/* Sub Category */}
      <Route path="/subCategories/add" element={<Pages.AddSubCategory />} />
      <Route
        path="/subCategories/edit/:id"
        element={<Pages.EditSubCategory />}
      />
      <Route path="/subCategories" element={<Pages.SubCategoryList />} />

      {/* Newsletters */}
      <Route path="/newsletters/add" element={<Pages.AddNewsletter />} />
      <Route path="/newsletters/edit/:id" element={<Pages.EditNewsletter />} />
      <Route path="/newsletters" element={<Pages.NewsletterList />} />

      {/* Sizes */}
      <Route path="/sizes/add" element={<Pages.AddSize />} />
      <Route path="/sizes/edit/:id" element={<Pages.EditSize />} />
      <Route path="/sizes" element={<Pages.SizeList />} />

      {/* Types */}
      <Route path="/types/add" element={<Pages.AddType />} />
      <Route path="/types/edit/:id" element={<Pages.EditType />} />
      <Route path="/types" element={<Pages.TypeList />} />

      {/* Users */}
      <Route path="/users/add" element={<Pages.AddUser />} />
      <Route path="/users/edit/:id" element={<Pages.EditUser />} />
      <Route path="/users" element={<Pages.UserList />} />
      <Route path="/users/details/:id" element={<Pages.UserDetails />} />

      {/* Orders */}
      {/* <Route path="/orders/add" element={<Pages.AddUser />} /> */}
      <Route path="/orders/edit/:id" element={<Pages.EditOrder />} />
      <Route path="/orders" element={<Pages.OrderList />} />
      <Route path="/orders/details/:id" element={<Pages.OrderDetails />} />

      {/* Inquiries */}
      <Route path="/inquiries/add" element={<Pages.AddInquiry />} />
      <Route path="/inquiries/edit/:id" element={<Pages.EditInquiry />} />
      <Route path="/inquiries" element={<Pages.InquiryList />} />
      <Route path="/inquiries/details/:id" element={<Pages.InquiryDetails />} />

      {/* Products */}
      <Route path="/products/add" element={<Pages.AddProduct />} />
      <Route path="/products/edit/:id" element={<Pages.EditProduct />} />
      <Route path="/products" element={<Pages.ProductList />} />
      <Route path="/products/details/:id" element={<Pages.ProductDetails />} />

      {/* File Details */}
      <Route path="/fileDetails/:fileName" element={<Pages.ViewFile />} />
    </Routes>
  );
}
