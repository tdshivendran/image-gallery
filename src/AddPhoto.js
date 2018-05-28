import React from 'react';

let api = {
    url: 'https://animalrestapi.azurewebsites.net',
    ID: 'b239ca06-2015-4ae6-82ac-0875cdb4c919'
};

class AddPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeName=this.handleChangeName.bind(this);
        this.handleChangeScientificName=this.handleChangeScientificName.bind(this);
        this.handleChangefamily=this.handleChangefamily.bind(this);
        this.handleChangeURL=this.handleChangeURL.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

        this.state = {
            pageCreate: api.url+'/Animal/Create?CandidateID='+api.ID,
            commonName:'',
            scientificName:'null',
            family:'null',
            imageURL:'',
            status:''
        };
    }
    handleChangeName(e) {
        this.setState({commonName: e.target.value});
    }
    handleChangeScientificName(e){
        this.setState({scientificName: e.target.value});
    }
    handleChangefamily(e){
        this.setState({family: e.target.value});
    }
    handleChangeURL(e){
        this.setState({imageURL: e.target.value});
    }
    handleSubmit(e){
        console.log(this.state.commonName);
        console.log(this.state.scientificName);
        console.log(this.state.family);
        console.log(this.state.imageURL);

        let upload = 0;
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

        fetch(this.state.pageCreate, {
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
                alert("Submit Successful");
            }
            else {
                alert("Submit unsuccessful at the server" +
                    "\nPossible Cause: Authentication Error" +
                    "\nFix: Check if the user authentication information is changed or removed")
            }
        }).catch(function (error) {
            alert("Submit unsuccessful" +
                "\nPossible Cause: Link might be broken, removed or expired" +
                "\nFix: Check if the link is working properly and try again");
        });
    }

    render(){
        return(
            <div>
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label>Name *</label>
                            <input type="text" class="form-control" onChange={this.handleChangeName} placeholder="Name of the animal. Ex: Cat, Dog, etc." required></input>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Scientific Name</label>
                            <input type="text" class="form-control" onChange={this.handleChangeScientificName} placeholder="Scientific name of the animal"></input>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Family</label>
                            <input type="text" class="form-control" onChange={this.handleChangefamily}  placeholder="Family of the animal. Ex: Domestic, Wild, etc."></input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Image URL *</label>
                        <input type="text" class="form-control" onChange={this.handleChangeURL}  placeholder="Enter a valid image URL here" required></input>
                    </div>
                    <div class="text-center">
                        <button type="submit" onClick={this.handleSubmit} class="btn btn-primary">Add</button>
                    </div>
                </form>
                {this.state.status}
            </div>
        );
    }
}

export default AddPhoto;