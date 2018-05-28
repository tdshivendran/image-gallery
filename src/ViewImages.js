import React from "react";

class ViewImages extends React.Component{
    constructor(props){
        super(props);
        this.onClickCloseOverlay=this.onClickCloseOverlay.bind(this);
        this.viewPicture=this.viewPicture.bind(this);
        this.state={
            items: '',
            listItems: '',
            showOverlay: ''
        };
    }

    onError(e) {
        e.target.src="image-not-available.jpg";

    }

    onClickCloseOverlay(){
        this.setState({showOverlay: ''});
    }

    viewPicture(src,name) {
        this.setState({showOverlay: [
                <div id="viewPicture">
                    <div onClick={this.onClickCloseOverlay} class="overlay"></div>
                    <div id="overlayContainer" class="container">
                        <button class="closeButton" onClick={this.onClickCloseOverlay}>&times;</button>
                        <div class="overlayContent">
                            <h3>{name}</h3>
                            <div id="viewPictureWrap" class="container">
                                <img class="img-fluid" onError={this.onError.bind(this)} src={src} alt="Card image cap"></img>
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

                </div>
            )
        }
        else {
            return (
                <div>
                    {this.state.showOverlay}
                    <ul class="row">
                        {this.props.items.map(list => (
                            <li id="grid" class="col-lg-3 col-md-4 col-sm-6 col-12 text-center inline">
                                <div  id="listImg">
                                    <p class="container" id="viewName">{list.commonName}</p>
                                    <button onClick={this.viewPicture.bind(this, list.imageURL, list.commonName)} title="View Photo" id="viewButton" class="btn btn-light">View</button>
                                    <img class="img align-bottom" onError={this.onError.bind(this)} src={list.imageURL} alt="Card image cap"></img>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default ViewImages;