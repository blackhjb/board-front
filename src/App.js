import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent.jsx';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import LoginComponent from './components/jwtlogin/LoginComponent'
function App() {
  return (
    <div> 
      <Router>             
        <HeaderComponent/> 
          <div className="container">
            <Switch>       
            <Route path="/" exact component={LoginComponent}/>
            <Route path="/login" component={LoginComponent}/>
              <Route path = "/boardList" exact component = {ListBoardComponent}></Route>
              <Route path = "/board" component = {ListBoardComponent}></Route>
              <Route path = "/create-board/:no" component = {CreateBoardComponent}></Route>
              <Route path = "/read-board/:no" component = {ReadBoardComponent}></Route>
            </Switch>
          </div>
        <FooterComponent/> 
      </Router>
    </div>
  );
}

export default App;