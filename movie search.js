var searchButtonElement = document.getElementById("search")
var inputTagElement = document.getElementById('input-tag')
var movieWrapperElement = document.getElementById("movie-wrapper")
var messageElement = document.getElementById("message")
var loadingMessageElement = document.getElementById("loading-message")
searchButtonElement.addEventListener("click",function(){
    var valueInInputTag = inputTagElement.value;
    loadingMessageElement.innerText = "Loading...."
    if(valueInInputTag == ""){
        alert ("Please enter any movie name")
    }else{
        $.get("https://www.omdbapi.com/?apikey=45f0782a&s="+valueInInputTag , function(reponse){
            loadingMessageElement.innerText = "";
            var returnedArray = reponse
            var movieNamesArray = reponse.Search
            movieWrapperElement.innerHTML = ""
            inputTagElement.value = ""
            $("#message").css({"display":"none"})
            if(returnedArray.Response == "True"){
                for(var i = 0 ;i < movieNamesArray.length; i++){
                    movieWrapperElement.innerHTML += `
                        <div class="movie-card">
                            <img src="${movieNamesArray[i].Poster}" class="movie-poster"/>
                            <p class="movie-title">Movie :${movieNamesArray[i].Title}</p>
                            <p class="movie-year">Year :${movieNamesArray[i].Year}</p>
                        </div>
                        `
                }   
            }else{
                $("#message").css({"display":"flex"})
                messageElement.innerText = "Not Avaliable"
            }
            
        })
    }
})