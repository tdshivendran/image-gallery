import React from "react";
import AddPhoto from "./AddPhoto";

let api = {
    url: 'https://animalrestapi.azurewebsites.net',
    ID: 'b239ca06-2015-4ae6-82ac-0875cdb4c919'
};

class ViewImages extends React.Component{
    constructor(props){
        super(props);
        this.onClickCloseOverlay=this.onClickCloseOverlay.bind(this);
        this.handleClickDeletePhoto=this.handleClickDeletePhoto.bind(this);
        this.viewPicture=this.viewPicture.bind(this);
        this.state={
            items: '',
            listItems: '',
            showOverlay: '',
            pageDelete: api.url+'/Animal/Delete?CandidateID='+api.ID,
        };
    }

    onError(e) {
        e.target.src="image-not-available.jpg";

    }

    onClickCloseOverlay(){
        this.setState({showOverlay: ''});
    }

    handleClickDeletePhoto(id){
        let input = {
            'ID': id,
        };

        let formBody = [];
        for (let property in input) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(input[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");


        fetch(this.state.pageDelete, {
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
                alert("Delete Successful");
            }
            else {
                alert("Delete unsuccessful at the server" +
                    "\nPossible Cause: Authentication Error" +
                    "\nFix: Check if the user authentication information is changed or removed" +
                    "\nPossible Cause: Image ID not found")
            }
        }).catch(function (error) {
            alert("Delete unsuccessful" +
                "\nPossible Cause: Link might be broken, removed or expired" +
                "\nFix: Check if the link is working properly and try again");
        });
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
        if (this.props.items === 'AddPhoto') {
            return(
                <div>
                    <AddPhoto/>
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.state.showOverlay}
                    <ul class="row">
                        {this.props.items.reverse().map(list => (
                            <li key={list.id} class="col-lg-3 col-md-4 col-sm-6 col-12 text-center inline" id="grid">
                                <div id="listImg">
                                    <p class="container" id="viewName">{list.commonName}</p>
                                    <button onClick={this.viewPicture.bind(this, list.imageURL, list.commonName, list.id)} title="View Photo" id="viewButton" class="btn btn-light">View</button>
                                    <button onClick={this.handleClickDeletePhoto.bind(this, list.id)} title="Delete Photo" id="deleteButton" class="btn btn-light">Delete</button>
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