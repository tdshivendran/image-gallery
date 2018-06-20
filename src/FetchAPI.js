
export async function FetchContent(){
    let url = process.env.REACT_APP_API_URL + "Animal/List?candidateID=" + process.env.REACT_APP_API_ID;
    let contents = await fetch(url).then(function(res){
        return res.json();
    }).then(function (data) {
        return data;
    }).catch(function(error){
        console.log(error);
        return 'error';
    });
    return contents;
}

export async function AddContent(formbody){
    let createURL = process.env.REACT_APP_API_URL + "Animal/Create?CandidateID=" + process.env.REACT_APP_API_ID;
    let response = await fetch(createURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formbody
    }).then(function(result){
        return result.json();
    }).then(function(response){
        return response;
    }).catch(function(error){
        console.log(error);
        return 'error';
    });
    return response;
}

export async function DeleteContent(formbody,auth_ID){
    let deleteURL = process.env.REACT_APP_API_URL + "Animal/Delete?CandidateID=" + auth_ID;
    let response = await fetch(deleteURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formbody
    }).then(function(result){
        return result.json();
    }).then(function(response){
        return response;
    }).catch(function(error){
        console.log(error);
        return 'error';
    });
    return response;
}

export async function infoContent(imgID){
    let infoURL = process.env.REACT_APP_API_URL + "Animal/id/" + imgID + "?CandidateID=" + process.env.REACT_APP_API_ID;
    let response = await fetch(infoURL).then(function(res){
        return res.json();
    }).then(function (data) {
        return data;
    }).catch(function(error){
        console.log(error);
        return 'error';
    });
    return response;
}