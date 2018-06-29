
/* Asynchronous function  : fetchContent
 * Functionality: Fetches image list from API. Logs errors in the console.
 * Returns: JSON data from api (OR) 'error' if any error is encountered.
 * Usage: <MainPage/> component. */

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

/* Asynchronous function  : AddContent
 * Functionality: POST new image information to the API. Logs errors in the console.
 * Returns: JSON data from api (OR) 'error' if any error is encountered.
 * Usage: <AddPhoto/> component. */

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

/* Asynchronous function  : DeleteContent
 * Functionality: POST image ID to the API to be deleted. Logs errors in the console.
 * Returns: JSON data from api (OR) 'error' if any error is encountered.
 * Usage: <DeletePhoto/> component. */

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

/* Asynchronous function  : infoContent
 * Functionality: Fetches all information about an image. Logs errors in the console.
 * Returns: JSON data from api (OR) 'error' if any error is encountered.
 * Usage: <ViewImage/> component. */

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