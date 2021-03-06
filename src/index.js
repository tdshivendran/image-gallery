import React from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import registerServiceWorker from './registerServiceWorker';
import MainPage from './main/mainpage';
import Navbar from "./nav/NavBar";

let imageList = []; // Array list for storing fetched images.
// Any changes in the database will be automatically reflected in the app using this array.

// Component App renders Navbar and Mainpage
class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <MainPage/>
            </div>
        );
    }
}

export default imageList;

// ENTRY POINT OF APPLICATION
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();