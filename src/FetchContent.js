import React from "react";
import ViewImages from './ViewImages';

class FetchContent extends React.Component{
    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.state={
            status:'',
            items:''
        }
    }
    componentDidMount(){
        let url = process.env.REACT_APP_API_URL + "Animal/List?candidateID=" + process.env.REACT_APP_API_ID
        fetch(url).then(function(res){
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

