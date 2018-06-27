import React from 'react';
import {AddContent} from "./FetchAPI";
import imageList from "./index";

/* Component : AddPhoto [Adds an image record into database.]
 * Functionality: Read inputs from user -> Upload image information into the database and imagelist array -> Display success or error messages.
 *
 * This component will perform conditional rendering.
 *  ** Renders input form and error messages while reading inputs.**
 *  ** Renders success message when image is uploaded successfully. **
 *
 * Working of the component
 *  ** Read inputs from user and check appropriate information is provided. **
 *  ** When appropriate information is available, the data is encoded as a Uniform Resource Identifier component. **
 *  ** After encoding into URI, the data is uploaded in the database using POST method. **
 *  ** On successful upload, a new id is returned from the database. **
 *  ** The new image ID, commonName and imageURL is added to the imagelist Array. **
 *  ** When the imagelist is updated, imageGrid component is updated to display the new image. ** */

class AddPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeName=this.handleChangeName.bind(this);
        this.handleChangeScientificName=this.handleChangeScientificName.bind(this);
        this.handleChangefamily=this.handleChangefamily.bind(this);
        this.handleChangeURL=this.handleChangeURL.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

        this.state = {
            commonName:'',
            scientificName:'',
            family:'',
            imageURL:'',
            status:'',
            resChk: false,
            newID:'',
        };
    }
    handleChangeName(e) {
        this.setState({commonName: e.target.value});
        e.preventDefault();
    }

    handleChangeScientificName(e){
        this.setState({scientificName: e.target.value});
        e.preventDefault();
    }

    handleChangefamily(e){
        this.setState({family: e.target.value});
        e.preventDefault();
    }

    handleChangeURL(e){
        this.setState({imageURL: e.target.value});
        e.preventDefault();
    }

    handleSubmit(){
        if(this.state.imageURL === ''){
            this.setState({
                status:[
                    <div class="alert alert-warning" role="alert">
                        <strong>Info!</strong> Image URL should not be blank. Please enter valid image URL.
                    </div>
                ]
            })
        }

        if(this.state.commonName === ''){
            this.setState({
                status:[
                    <div class="alert alert-warning" role="alert">
                        <strong>Info!</strong> Name should not be blank. Please enter a Name.
                    </div>
                ]
            })
        }

        if(this.state.imageURL !== '' && this.state.commonName !== ''){
            let input = {
                'commonName': this.state.commonName,
                'scientificName': this.state.scientificName,
                'family': this.state.family,
                'imageURL': this.state.imageURL
            };

            let formBody = [];
            for (let property in input) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(input[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            let response=AddContent(formBody);
            response.then(function(data) {
                if(data !== 'error'){
                    if(data.status === 'OK'){
                        this.setState({
                            status:[
                                <div class="alert alert-success" role="alert">
                                    <strong>Success!</strong> Image uploaded successfully.
                                </div>
                            ],
                            newID: data.id,
                            resChk: true
                        });
                    }
                    else {
                        this.setState({
                            status:[
                                <div class="alert alert-danger" role="alert">
                                    <strong>Alert!</strong> {data.status}
                                </div>
                            ]
                        });
                    }
                }
                else{
                    this.setState({
                        status:[
                            <div class="alert alert-danger" role="alert">
                                <strong>Alert!</strong> Upload unsuccessful. Link might be broken, removed or expired. Check if the link is working properly and try again.
                            </div>
                        ]
                    })
                    }
            }.bind(this));
        }
    }

    render(){
        if(this.state.resChk){
            imageList.push({id: this.state.newID, commonName:this.state.commonName, imageURL: this.state.imageURL});
            return(
                <div class="text-center">
                    <h2 class="text-center">Add images of the animals using URL's</h2>
                    <br/>
                    {this.state.status}
                </div>
            );
        }
        else{
            return(
                <div>
                    <h2 class="text-center">Add images of the animals using URL's</h2>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label>Name *</label>
                            <input type="text" class="form-control" onChange={this.handleChangeName} placeholder="Ex: Cat, Dog, etc." required></input>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Scientific Name</label>
                            <input type="text" class="form-control" onChange={this.handleChangeScientificName} placeholder="Scientific name of the animal"></input>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Family</label>
                            <input type="text" class="form-control" onChange={this.handleChangefamily}  placeholder="Ex: Domestic, Wild, etc."></input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Image URL *</label>
                        <input type="text" class="form-control" onChange={this.handleChangeURL}  placeholder="Enter a valid image URL here" required></input>
                    </div>
                    <div class="text-center">
                        <button onClick={this.handleSubmit} class="btn btn-primary">Add</button>
                    </div>
                    <br/>
                    <span class="text-center">{this.state.status}</span>
                </div>
            );
        }
    }
}

export default AddPhoto;