import React from 'react';
import FetchContent from './FetchContent';
import AddPhoto from './AddPhoto';
import ViewImages from "./ViewImages";

let api = {
    url: 'https://animalrestapi.azurewebsites.net',
    ID: 'b239ca06-2015-4ae6-82ac-0875cdb4c919'
};

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.handleClickAddPhoto=this.handleClickAddPhoto.bind(this);
        this.onClickCloseOverlay=this.onClickCloseOverlay.bind(this);
        this.state = {
            uploadstatus:'',
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
                        <h2 class="text-center">Add images of the animals using URL's</h2>
                        <ViewImages items='AddPhoto'/>
                    </div>
                </div>
            </div>
            ]});
    }

    render() {
        return (
            <div>
                <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" id="Nav-link" href="#">Image Gallery
                        <button id="submitPhoto" onClick={this.handleClickAddPhoto} class="btn btn-outline-success justify-content-left" type="button"> + Add Photo </button>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                            <form class="form-inline">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </ul>
                    </div>
                </nav>
                <div>
                    {this.state.showOverlay}
                    <div class="imageWrap">
                        <h1 class="text-center">Beautiful Free Photos</h1>
                        <p class="text-center">View, Download and Add photos to be shared everywhere</p>
                        <FetchContent/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;



