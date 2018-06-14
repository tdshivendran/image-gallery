import React from "react";

class DeletePhoto extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeID=this.handleChangeID.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.state={
            imgID: props.ID,
            AuthID: '',
            status:''
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

            let deleteURL = process.env.REACT_APP_API_URL + "Animal/Delete?CandidateID=" + this.state.AuthID;
            fetch(deleteURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            }).then(function(result){
                return result.json();
            }).then(function(response){
                if (response.status === 'OK'){
                    this.setState({status:"Delete Successful. Please Refresh the page."})
                }
                else {
                    this.setState({status: response.status})
                }
            }.bind(this)).catch(function(error){
                this.setState({status: "Delete unsuccessful." +
                    "\nLink might be broken, removed or expired." +
                    "\nCheck if the link is working properly and try again"})
            }.bind(this));
        }
        else {
            this.setState({status:"Please enter Auth-ID"});
        }

    }

    render(){
        return(
            <div>
                <h2 class="text-center">Authenticated Delete Action</h2>
                <p class="text-center">Only authenticated users are able to perform delete action.</p>
                <p class="text-center text-muted">Contact admin to become an authenticated user</p>
                <p class="text-center">Please enter the Authentication ID if you are a authenticated user.</p>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Auth-ID</label>
                    <div class="col-sm-10">
                        <input onChange={this.handleChangeID} class="form-control" placeholder="Authentication ID" required></input>
                    </div>
                </div>
                <br/>
                <div class="text-center">
                    <button onClick={this.handleDelete} class="btn btn-primary">Delete</button>
                </div>
                <br/>
                <p class="text-center text-muted">{this.state.status}</p>
            </div>
        );
    }
}

export default DeletePhoto;