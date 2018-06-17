import React from 'react';
import ImageGrid from "./ImageGrid";
import imageList from "./index";
import {FetchContent} from "./FetchAPI";

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
                        <a href="https://tdshivendran.github.io/aboutme/" target="_blank" class="btn btn-outline-secondary" type="button" rel="noopener noreferrer">
                            Admin
                        </a>
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