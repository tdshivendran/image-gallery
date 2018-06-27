import React from 'react';
import ImageGrid from "./ImageGrid";
import imageList from "./index";
import {FetchContent} from "./FetchAPI";

/* Component : Main Page.
 * Functionality: Fetches images from API -> Loads Images into imagelist Array variable -> Display image grid using <ImageGrid/>
 *
 * This component will perform conditional rendering based on fetching the images.
 *  ** Renders LOADING when images are being fetched. **
 *  ** Renders IMAGE GRID after images are fetched. **
 *  ** Renders Error PAGE if an error is encountered while fetching  **
 *
 * Working of the component
 *  ** Fetches images from the api using GET. **
 *  ** Loads images into an imagelist array and renders <ImageGrid/> component upon successful fetch. **
 *  ** Appropriate error messages are displayed when the fetch encounters an error. ** */

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.componentWillMount=this.componentWillMount.bind(this);
        this.state={
            items: '',
            status: 'Loading..',
        };
    }

    componentWillMount(){
        let data=FetchContent();
        data.then(function(data) {
            if(data !== 'error'){
                if(data.status === 'OK'){
                    this.setState({items:data.list, status:data.status});
                }
                else {
                    this.setState({status:data.status});
                }
            }
            else{
                this.setState({status: "Cannot load data." +
                    "\nLink might be broken, removed or expired." +
                    "\nCheck if the link is working properly and try again"});
            }
        }.bind(this));
    }

    render() {
        if (this.state.status ==='Loading..') {
            return(
                <div class="main">
                    <div class="text-center">
                        <i id="loadingSpinner" class="fas fa-spinner fa-spin"></i>
                        <p>Loading...</p>
                    </div>
                </div>
            );
        }
        if (this.state.items === '') {
            return(
                <div class="main">
                    <div class="text-center">
                        <h1>Error Loading Contents</h1>
                        <div class="alert alert-danger" role="alert">
                            <strong>Oh snap!</strong> {this.state.status}
                        </div>
                        <p>To know more contact Admin</p>
                        <a href='mailto:tdshivendran@gmail.com?Subject=Image-gallery%20website%20error' type="button" class="btn btn-outline-secondary"  target="_top">Admin</a>
                    </div>
                </div>
            )
        }
        else{
            for (let i=0; i<this.state.items.length; i++){
                imageList.push(this.state.items[i]);
            }

            return (
                <div>
                    <ImageGrid/>
                </div>
            );
        }
    }
}

export default MainPage;