import React from "react";
import {DeleteContent} from "./FetchAPI";
import imageList from "./index";

class DeletePhoto extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeID=this.handleChangeID.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.state={
            imgID: props.ID,
            imgname: props.Name,
            AuthID: '',
            status:'',
            resChk:false
        }
    }

    handleChangeID(e) {
        this.setState({AuthID:e.target.value});
        e.preventDefault();
    }

    handleDelete() {
        if(this.state.AuthID !== '') {

            let input = {
                'ID': this.state.imgID
            };

            let formBody = [];
            for (let property in input) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(input[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            let response=DeleteContent(formBody, this.state.AuthID);
            response.then(function(data) {
                if(data !== 'error'){
                    if(data.status === 'OK'){
                        this.setState({
                            status:[
                                <div class="alert alert-success" role="alert">
                                    <strong>Success!</strong> Image deleted successfully.
                                </div>
                            ],
                            resChk:true
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
                                <strong>Alert!</strong> Delete unsuccessful. Link might be broken, removed or expired. Check if the link is working properly and try again.
                            </div>
                        ]
                    })
                }
            }.bind(this));
        }
        else {
            this.setState({
                status:[
                    <div class="alert alert-warning" role="alert">
                        <strong>Info!</strong> Auth-ID should not be blank. Please enter Auth-ID.
                    </div>
                ]
            });
        }

    }

    render(){
        if(this.state.resChk){
            let index=imageList.map(function(o) { return o.id; }).indexOf(this.state.imgID);
            imageList.splice(index, 1);
            return(
                <div class="text-center">
                    <h2>Authenticated Delete Action</h2>
                    <p>Only authenticated users are able to perform delete action.</p>
                    <br/>
                    {this.state.status}
                    <br/>
                </div>
            );

        }
        else{
            return(
                <div class="text-center">
                    <h2>Authenticated Delete Action</h2>
                    <p>Only authenticated users are able to perform delete action.</p>
                    <p class="text-muted">Contact admin to become an authenticated user</p>
                    <p>Please enter the Authentication ID to delete <strong>{this.state.imgname}</strong> image</p>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Auth-ID</label>
                        <div class="col-sm-10">
                            <input onChange={this.handleChangeID} class="form-control" placeholder="Authentication ID" required></input>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <button onClick={this.handleDelete} class="btn btn-primary">Delete</button>
                    </div>
                    <br/>
                    {this.state.status}
                </div>
            );
        }
    }
}

export default DeletePhoto;