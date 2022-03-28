import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddPostScreen from "./screens/AddPostScreen";
import EditPostScreen from "./screens/EditPostScreen";
import SavedPostsScreen from "./screens/SavedPostsScreen";
import CodeOfConduct from "./screens/CodeOfConduct";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import TermsOfUse from "./screens/TermsOfUse";
import OTPScreen from "./screens/OTPScreen";
import Footer from "./components/Footer";
import ForgotPassword from "./screens/ForgotPassword";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <main className="py-3">
        <Routes>
          <Route exact path="/posts/:id" element={<PostScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          <Route exact path="/addpost" element={<AddPostScreen />} />
          <Route exact path="/saved" element={<SavedPostsScreen />} />

          <Route exact path="/code-of-conduct" element={<CodeOfConduct />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/terms-of-use" element={<TermsOfUse />} />

          <Route exact path="/editpost/:id" element={<EditPostScreen />} />

          <Route exact path="/profile" element={<ProfileScreen />} />
          <Route exact path="/login" element={<LoginScreen />} />
          <Route path="/email-verify" element={<OTPScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/search/:keyword" element={<HomeScreen />} />

          <Route exact path="/" element={<HomeScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
