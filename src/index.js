import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import MainPage from './mainpage';
import Navbar from "./NavBar";

let imageList = [];

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

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();