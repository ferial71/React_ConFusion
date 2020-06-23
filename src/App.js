import React, {Component} from 'react';
import './App.css';
import {DISHES} from './shared/dishes'
import Main from './components/MainComponent';


class App extends Component{

    render() {
        return (
            <div className="App">
                <Main />
            </div>
        );
    }


}

export default App;
