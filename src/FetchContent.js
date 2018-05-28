import React from "react";
import ViewImages from './ViewImages';

// let data={"status":"OK","list":[{"id":"1","commonName":"Pikachu","imageURL":"http://cartoonbros.com/wp-content/uploads/2016/08/pikachu-13.png"},{"id":"2","commonName":"Charizard","imageURL":"http://cdn.bulbagarden.net/upload/thumb/2/2a/Pokk%C3%A9n_Charizard.png/220px-Pokk%C3%A9n_Charizard.png"},{"id":"3","commonName":"Cat","imageURL":"https://yt3.ggpht.com/-V92UP8yaNyQ/AAAAAAAAAAI/AAAAAAAAAAA/zOYDMx8Qk3c/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"}]};
// let data1={"commonName":"Dog","scientificName":"Dog","family":"Domestic","imageURL":"https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg"}

class FetchContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:'https://animalrestapi.azurewebsites.net/Animal/List?candidateID=b239ca06-2015-4ae6-82ac-0875cdb4c919',
            status:'',
            items:''
        }
    }
    componentDidMount(){
        // this.setState(
        //     {status:data.status, items:data.list}
        // );


        fetch(this.state.url).then(function(res){
            return res.json();
        }).then(function (data) {
            this.setState(
                {status:data.status, items:data.list}
            );
        }.bind(this));
    }

    render(){
        return(
            <div>
                <ViewImages items={this.state.items}/>
            </div>
        );
    }
}

export default FetchContent;