import React from 'react';
import FetchContent from './FetchContent';
import ViewImages from "./ViewImages";

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.handleClickAddPhoto=this.handleClickAddPhoto.bind(this);
        this.onClickCloseOverlay=this.onClickCloseOverlay.bind(this);
        this.state = {
            showOverlay: ''
        };
    }

    onClickCloseOverlay(){
        this.setState({showOverlay: ''});
    }

    handleClickAddPhoto(){
        this.setState({showOverlay: [
            <div>
                <div onClick={this.onClickCloseOverlay} class="overlay"></div>
                <div id="overlayContainer" class="container">
                    <button class="closeButton" onClick={this.onClickCloseOverlay}>&times;</button>
                    <div class="overlayContent">
                        <ViewImages items="Add Photo"/>
                    </div>
                </div>
            </div>
            ]});
    }


    render() {
        return (
            <div>
                <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" id="Nav-link" href={process.env.PUBLIC_URL}>Image Gallery
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">

                        <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                            <button id="submitPhoto" onClick={this.handleClickAddPhoto} class="btn btn-outline-success" type="button">Add Photo</button>
                            <a href="https://tdshivendran.github.io/aboutme/" target="_blank" id="aboutButton" class="btn btn-outline-secondary" role="button" rel="noopener noreferrer">About Developer</a>
                        </ul>
                    </div>
                </nav>
                <div>
                    {this.state.showOverlay}
                    <div class="imageWrap">
                        <FetchContent/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;



