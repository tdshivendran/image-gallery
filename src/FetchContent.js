import React from "react";
import ViewImages from './ViewImages';

class FetchContent extends React.Component{
    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.state={
            url:'https://animalrestapi.azurewebsites.net/Animal/List?candidateID=b239ca06-2015-4ae6-82ac-0875cdb4c919',
            status:'',
            items:''
        }
    }
    componentDidMount(){
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
                <ViewImages
                    items={this.state.items}
                />
            </div>
        );
    }
}

export default FetchContent;