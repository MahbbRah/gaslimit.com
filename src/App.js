import { Switch, Route } from 'react-router-dom';
import './App.css'
import './responsive.css'
import Home from './components/home'
// import SearchAds from './components/searchAds/searchAds';
// import ViewAd from './components/AdView/ViewAd';
// import Folders from './components/Folders/Folders';
// import FolderSingle from './components/Folders/FolderSingle';
// import Favorites from './components/Favorites/Favorites';
// import LoginPage from './components/login/LoginPage';
// import RegisterPage from './components/register/RegisterPage';


function App() {

  //do not redirect if the path is registration
  // const pathReg = window.location.pathname.includes("/register")
  // const history =  useHistory();
  // if (!localStorage.getItem("authToken") && !pathReg){
  //   history.push("/login");
  // }

  document.title = "Gas Limits"
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/about">
          <About />
        </Route>
        <Route path="/portfolio">
          <Portfolio />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route> */}
        {/* <Route path="/search_ads">
          <SearchAds />
        </Route> */}
        
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
