import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import MainPage from './mainpage';

class App extends React.Component {
    render() {
        return (
            <div>
                <MainPage/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();