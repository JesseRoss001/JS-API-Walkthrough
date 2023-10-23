const API_KEY = "xvufK8B2JIERzCqJvO6nJlZRs84";
const API_URL ="https://ci-jshint.herokuapp.com/api";
const resultsModal =new bootstrap.Modal(document.getElementById("resultsModal")); 

document.getElementById("status").addEventListener("click",e => getStatus(e));
document.getElementById("submit").addEventListener("click",e => postForm(e));

async function postForm(e) {

    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });

    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }

}

function displayErrors(data) {
    let heading =`JSHINT results for ${data.file}`

    if (data.total_errors === 0 ) {
        results ='<div class="no_errors">No errors reported ! </div>';
    }else {
        results = '<div> Total Errors : <span class="error_count"> ${data.total_error} </span> </div>'
    }

    }
}


async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        console.log(data);
    } else{ throw new Error(data.error);
}} 

function displayStatus(data) {
document.getElementById("resultsModelTitle").innerText = heading;
document.getElementById("results-content").innerText = results; 
    resultsModal.show();
}



