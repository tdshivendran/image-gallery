import React from "react";
import DeletePhoto from "./DeletePhoto";
import AddPhoto from "./AddPhoto";

class ViewImages extends React.Component{
    constructor(props){
        super(props);
        this.onClickCloseOverlay=this.onClickCloseOverlay.bind(this);
        this.handleClickDeletePhoto=this.handleClickDeletePhoto.bind(this);
        this.handleChangeSearch=this.handleChangeSearch.bind(this);
        this.viewPicture=this.viewPicture.bind(this);
        this.state={
            items: '',
            listItems: '',
            showOverlay: '',
            search: '',
        };
    }

    handleChangeSearch(e) {
        this.setState({search:e.target.value.substr(0,20)});
    }

    onError(e) {
        e.target.src="image-not-available.jpg";

    }

    onClickCloseOverlay(){
        this.setState({showOverlay: ''});
    }

    handleClickDeletePhoto(id){
        this.setState({showOverlay: [
                <div id="DeletePhotoOverlay">
                    <div onClick={this.onClickCloseOverlay} class="overlay"></div>
                    <div id="overlayContainer" class="container">
                        <button class="closeButton" onClick={this.onClickCloseOverlay}>&times;</button>
                        <div class="overlayContent">
                            <DeletePhoto ID={id}/>
                        </div>
                    </div>
                </div>
            ]});
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
                                <img class="img-fluid" onError={this.onError.bind(this)} src={src} alt="Card image cap"/>
                            </div>
                        </div>
                    </div>
                </div>
            ]});
    }

    render(){
        if (this.props.items === '') {
            return(
                <div>
                    {/*<div class="container text-center">*/}
                        {/*<h1>Error Loading the page</h1>*/}
                        {/*<p>To know more contact Admin</p>*/}
                        {/*<div class=" position-sticky input-group input-group-lg mb-3 d-flex justify-content-center">*/}
                            {/*<div class="input-group-append">*/}
                                {/*<a href="https://tdshivendran.github.io/aboutme/" target="_blank" class="btn btn-outline-secondary" type="button">*/}
                                    {/*Admin*/}
                                {/*</a>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            )
        }
        if (this.props.items === "Add Photo"){
            return(
                <div>
                    <AddPhoto/>
                </div>
            );
        }
        else {
            let searchImages = this.props.items.filter(
                (imagelist) => {
                    return imagelist.commonName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                }
            );
            return (
                <div>
                    {this.state.showOverlay}
                    <div class="container text-center">
                        <h1>Simple Image Gallery</h1>
                        <p>A simple gallery to view and share pictures online</p>
                        <div class=" position-sticky input-group input-group-lg mb-3 d-flex justify-content-center">
                            <input  type="text" onChange={this.handleChangeSearch} class="form-control" placeholder="Search Images..." id="searchBox"></input>
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" id="searchButton">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <ul class="row">
                        {searchImages.reverse().map(list => (
                            <li key={list.id} class="col-lg-3 col-md-4 col-sm-6 col-12 text-center inline" id="grid">
                                <div id="listImg">
                                    <p class="container" id="viewName">{list.commonName}</p>
                                    <button onClick={this.viewPicture.bind(this, list.imageURL, list.commonName, list.id)} title="View Photo" id="viewButton" class="btn btn-light">View</button>
                                    <button onClick={this.handleClickDeletePhoto.bind(this, list.id)} title="Delete Photo" id="deleteButton" class="btn btn-light"><i class="fas fa-trash-alt"></i></button>
                                    <img class="img align-bottom" onError={this.onError.bind(this)} src={list.imageURL} alt="Card image cap"></img>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <br/>
                    <div class="container text-center">
                        <p>To know more about this website, <a href="https://tdshivendran.github.io/aboutme/" target="_blank" rel="noopener noreferrer">contact developer</a></p>
                    </div>
                </div>
            );
        }
    }
}

export default ViewImages;