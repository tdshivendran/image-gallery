
async function FetchContent(){
    let url = process.env.REACT_APP_API_URL + "Animal/List?candidateID=" + process.env.REACT_APP_API_ID;
    let items = await fetch(url).then(function(res){
        return res.json();
    }).then(function (data) {
        return data;
    }).catch(function(error){
        return 'error';
    });
    return items;
}

export default FetchContent;