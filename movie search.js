
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
        $.get("http://www.omdbapi.com/?i=tt3896198&apikey=8ad164ad&s="+valueInInputTag , function(reponse){
            loadingMessageElement.innerText = "";
            var returnedArray = reponse
            var movieNamesArray = reponse.Search
            console.log(movieNamesArray)
            movieWrapperElement.innerHTML = ""
            inputTagElement.value = ""
            $("#message").css({"display":"none"})
            if(returnedArray.Response == "True"){
                for(var i = 0 ;i < movieNamesArray.length; i++){
                    console.log(movieNamesArray[i].imdbID)
                    $.get("http://www.omdbapi.com/?apikey=8ad164ad&i= "+movieNamesArray[i].imdbID,function(reponse){
                    var movieimdbIDList = reponse    
                    console.log(movieimdbIDList)
                        movieWrapperElement.innerHTML += `
                        <div class="movie-card">
                            <img src="${movieimdbIDList.Poster}" class="movie-poster"/>
                            <p class="movie-title">Movie :${movieimdbIDList.Title}</p>
                            <p class="movie-year">Director :${movieimdbIDList.Director}</p>
                            <p class="movie-year">Genre :${movieimdbIDList.Genre}</p>
                            <p class="movie-year">Year :${movieimdbIDList.Year}</p>
                            <p class="movie-year">Country :${movieimdbIDList.Country}</p>
                        </div>
                        `
                    })
                }   
            }else{
                $("#message").css({"display":"flex"})
                messageElement.innerText = "Not Avaliable"
            }
            
        })
    }
})
