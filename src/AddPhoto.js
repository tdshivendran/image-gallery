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
            if (response.status === 'OK'){
                this.setState({status:"Image successfully added. Please Refresh the page."})
            }
            else {
                this.setState({status: response.status})
            }
        }.bind(this)).catch(function(error){
            this.setState({status: "Upload unsuccessful." +
                "\nLink might be broken, removed or expired." +
                "\nCheck if the link is working properly and try again"})
        }.bind(this));
    }

    render(){
        return(
            <div>
                <h2 class="text-center">Add images of the animals using URL's</h2>
                <form>
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
                        <button type="submit" onClick={this.handleSubmit} class="btn btn-primary">Add</button>
                    </div>
                </form>
                <br/>
                <p class="text-center text-muted">{this.state.status}</p>
            </div>
        );
    }
}

export default AddPhoto;