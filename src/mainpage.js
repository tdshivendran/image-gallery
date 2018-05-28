import React from 'react';
import FetchContent from './FetchContent';
import AddPhoto from './AddPhoto';

let api = {
    url: 'https://animalrestapi.azurewebsites.net',
    ID: 'b239ca06-2015-4ae6-82ac-0875cdb4c919'
};

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.handleClickAddPhoto=this.handleClickAddPhoto.bind(this);
        this.handleClickDeletePhoto=this.handleClickDeletePhoto.bind(this);
        this.onClickCloseOverlay=this.onClickCloseOverlay.bind(this);
        this.state = {
            pageDelete: api.url+'/Animal/Delete?CandidateID='+api.ID,
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
                        <AddPhoto/>
                    </div>
                </div>
            </div>
            ]});
    }

    handleClickDeletePhoto(){
        let input = {
            'ID': '',
        };

        let formBody = [];
        for (let property in input) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(input[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");


        fetch(this.state.pageDelete, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(function(result){
            return result.json();
        }).then(function(response){
            console.log(response.status);
            if (response.status === 'OK'){
                alert("Delete Successful");
            }
            else {
                alert("Delete unsuccessful at the server" +
                    "\nPossible Cause: Authentication Error" +
                    "\nFix: Check if the user authentication information is changed or removed")
            }
        }).catch(function (error) {
            alert("Delete unsuccessful" +
                "\nPossible Cause: Link might be broken, removed or expired" +
                "\nFix: Check if the link is working properly and try again");
        });
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



