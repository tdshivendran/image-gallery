import React from "react";
import DeletePhoto from "./DeletePhoto";
import imageList from "./index.js";
import AddPhoto from "./AddPhoto";

class ImageGrid extends React.Component{
    constructor(props){
        super(props);
        this.onClickCloseOverlay=this.onClickCloseOverlay.bind(this);
        this.handleClickDeletePhoto=this.handleClickDeletePhoto.bind(this);
        this.handleChangeSearch=this.handleChangeSearch.bind(this);
        this.handleClickAddPhoto = this.handleClickAddPhoto.bind(this);
        this.viewPicture=this.viewPicture.bind(this);
        this.state={
            showOverlay: '',
            search: '',
        };
    }

    handleChangeSearch(e) {
        this.setState({search:e.target.value.substr(0,20)});
    }

    onClickCloseOverlay(){
        this.setState({showOverlay: ''});
    }

    handleClickAddPhoto() {
        this.setState({
            showOverlay: [
                <div>
                    <div onClick={this.onClickCloseOverlay} class="overlay"></div>
                    <div id="overlayContainer" class="container">
                        <button class="closeButton" onClick={this.onClickCloseOverlay}>&times;</button>
                        <div class="overlayContent">
                            <AddPhoto/>
                        </div>
                    </div>
                </div>
            ]
        });
    }

    handleClickDeletePhoto(id, name){
        this.setState({showOverlay: [
                <div id="DeletePhotoOverlay">
                    <div onClick={this.onClickCloseOverlay} class="overlay"></div>
                    <div id="overlayContainer" class="container">
                        <button class="closeButton" onClick={this.onClickCloseOverlay}>&times;</button>
                        <div class="overlayContent">
                            <DeletePhoto
                                ID={id}
                                Name={name}/>
                        </div>
                    </div>
                </div>
            ]});
    }

    onError(e) {
        e.target.src="image-not-available.jpg";

    }

    viewPicture(src,name,id) {
        this.setState({showOverlay: [
                <div id="viewPicture">
                    <div onClick={this.onClickCloseOverlay} class="overlay"></div>
                    <div id="overlayContainer" class="container">
                        <div class="overlayContent">
                            <label>
                                <h3>{name}</h3>
                                <p class="mutedText">Image ID:{id}</p>
                            </label>
                            <button class="closeButton" onClick={this.onClickCloseOverlay}>&times;</button>
                            <div id="viewPictureWrap" class="container">
                                <img class="img-fluid" onError={this.onError.bind(this)} src={src} alt={"Image "+name+" is unavailable"}></img>
                            </div>
                        </div>
                    </div>
                </div>
            ]});
    }

    render(){
        let searchImages = imageList.filter(
            (imagelist) => {
                return imagelist.commonName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return (
            <div class="imageWrap">
                {this.state.showOverlay}
                <div class="container text-center">
                    <h1>Simple Image Gallery</h1>
                    <p>A simple gallery to view and share pictures online</p>
                    <div>
                        <div class="input-group input-group-lg mb-3 d-flex justify-content-center">
                            <input  type="text" onChange={this.handleChangeSearch} class="form-control" placeholder="Search Images..." id="searchBox"></input>
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" id="searchButton">
                                    <i class="fas fa-search"></i>
                                </button>
                                <button id="submitPhoto" onClick={this.handleClickAddPhoto} class="btn btn-outline-success" type="button">Add Photo</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="image-grid-container justify-content-center">
                    {searchImages.reverse().map(list => (
                        <div class="image-container">
                            <div class="image" style={{
                                backgroundImage: `url(${list.imageURL})`,
                            }}>
                            </div>
                            <p id="viewName">{list.commonName}</p>
                            <button onClick={this.viewPicture.bind(this, list.imageURL, list.commonName, list.id)} title="View Photo" id="viewButton" class="btn btn-light">View</button>
                            <button onClick={this.handleClickDeletePhoto.bind(this, list.id, list.commonName)} title="Delete Photo" id="deleteButton" class="btn btn-light"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    ))}
                </div>
                <br/>
                <div class="container text-center">
                    <p>To know more about this website, <a href="https://tdshivendran.github.io/aboutme/" target="_blank" rel="noopener noreferrer">contact developer</a></p>
                </div>
            </div>
        );
    }
}

export default ImageGrid;