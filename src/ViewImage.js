import React from "react";
import {infoContent} from "./FetchAPI";

class ViewImage extends React.Component {
    constructor(props) {
        super(props);
        this.componentWillMount=this.componentWillMount.bind(this);
        this.state={
            imgID: props.imgID,
            imgName: props.imgName,
            imgURL: props.imgURL,
            status:'',
            imgsSciName:'',
            imgFamily:''
        }
    }

    onError(e) {
        e.target.src="image-not-available.jpg";

    }

    componentWillMount() {
        let data=infoContent(this.state.imgID);
        data.then(function(data) {
            if(data !== 'error'){
                if(data.status === 'OK'){
                    this.setState({
                        status:data.status,
                        imgSciName: data.animal.scientificName,
                        imgFamily: data.animal.family
                    });
                }
                else {
                    this.setState({status:data.status});
                }
            }
        }.bind(this));
    }

    render(){
        return(
            <div>
                <div>
                    <h3>{this.state.imgName}</h3>
                    <p class="mutedText">Image ID:{this.state.imgID}</p>
                </div>
                <div id="viewPictureWrap" class="container">
                    <img class="img-fluid" onError={this.onError.bind(this)} src={this.state.imgURL} alt={"Image "+this.state.imgName+" is unavailable"}></img>
                </div>
                <div>
                    <p id="viewFamily">Family: {this.state.imgFamily}</p>
                    <p id="viewScientific">Scientific Name: {this.state.imgSciName}</p>
                </div>
            </div>
        )
    }
}

export default ViewImage;

