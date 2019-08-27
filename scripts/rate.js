var districtText = document.getElementById("district-txt");
var schoolBox = document.getElementsByTagName("main")[0];
var url = window.location.toString();
var validUrl = url.indexOf("district");
if (validUrl == -1) {
  window.location.assign("index.html");
} else {
  var requestUrl = "schools/" + url.slice(validUrl + 9) + ".json";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      districtText.innerText = url.slice(validUrl + 9).replace(/_/g, " ");
      var district = JSON.parse(this.responseText);
      var numberRated = 0;
      district.schools.forEach((d, n) => {
        var box = document.createElement("section");
        box.setAttribute("class", "school-box");
        var school = document.createElement("h3");
        var schoolText = document.createTextNode(district.schools[n].name);
        school.appendChild(schoolText);
        box.appendChild(school);
                var rating = document.createElement("p");
        function countRatings (r) {
          return r > 0;
        }
        var totalRatings = district.schools[n].ratings.filter(countRatings);
        var ratingText = document.createTextNode(100 * (totalRatings.length / district.schools[n].ratings.length) + "% of users liked this school");
        rating.appendChild(ratingText);
        box.appendChild(rating);
        var numberOfRatings = document.createElement("p");
        var numberOfRatingsText = document.createTextNode("from " + district.schools[n].ratings.length + " users");
        numberOfRatings.appendChild(numberOfRatingsText);
        box.appendChild(numberOfRatings);
        var dislikeBtn = document.createElement("button");
        dislikeBtn.setAttribute("type", "button");
        dislikeBtn.setAttribute("class", "dislike-btn");
        var dislikeIcon = document.createElement("img");
        dislikeIcon.setAttribute("src", "../imgs/dislike.png");
        dislikeIcon.setAttribute("alt", "");
        dislikeBtn.appendChild(dislikeIcon);
        var dislikeBtnText = document.createTextNode("Dislike");
        dislikeBtn.appendChild(dislikeBtnText);
        box.appendChild(dislikeBtn);
        var likeBtn = document.createElement("button");
        likeBtn.setAttribute("type", "button");
        likeBtn.setAttribute("class", "dislike-btn");
        var likeIcon = document.createElement("img");
        likeIcon.setAttribute("src", "../imgs/like.png");
        likeIcon.setAttribute("alt", "");
        likeBtn.appendChild(likeIcon);
        var likeBtnText = document.createTextNode("Like");
        likeBtn.appendChild(likeBtnText);
        box.appendChild(likeBtn); 
        //Storage compadibility
        if (typeof(Storage) == "undefined") {
          dislikeBtn.disabled = "true";
          likeBtn.disabled = "true";
        } else {
          const lastRated = localStorage.getItem("lastRated");
          var date = new Date();
          var day = date.getDate();
          if (day == lastRated) {
            dislikeBtn.disabled = "true";
            likeBtn.disabled = "true";
          }
        }
        //Counter
        function checkRated() {
          if (numberRated == district.schools[n].length) {
            var date = new Date();
            var day = date.getDate();
            try {
              localStorage.setItem("lastRated", day);
              console.log("Rated for the day");
            } catch {
              alert("Your browser doesn't support local storage. Your ratings will be reversed.");
              districts.schools.forEach((d, n) => {
                districts.schools[n].pop();
              });
            }
          }
        }
        //Event listeners
        dislikeBtn.addEventListener("click", () => {
          dislikeBtn.disabled = "true";
          dislikeBtn.nextElementSibling.disabled = "true";
          district.schools[n].ratings.push(0);
          numberRated++;
          console.log(numberRated);
          if (numberRated == district.schools[n].length) {
            var date = new Date();
            var day = date.getDate();
            try {
              localStorage.setItem("lastRated", day);
              console.log("Rated for the day");
            } catch {
              alert("Your browser doesn't support local storage. Your ratings will be reversed.");
              districts.schools.forEach((d, n) => {
                districts.schools[n].pop();
              });
            }
          }
        });
        likeBtn.addEventListener("click", () => {
          likeBtn.disabled = "true";
          likeBtn.previousElementSibling.disabled = "true";
          district.schools[n].ratings.push(0);
          numberRated++;
          console.log(numberRated);
          if (numberRated == district.schools[n].length) {
            var date = new Date();
            var day = date.getDate();
            try {
              localStorage.setItem("lastRated", day);
              console.log("Rated for the day");
            } catch {
              alert("Your browser doesn't support local storage. Your ratings will be reversed.");
              districts.schools.forEach((d, n) => {
                districts.schools[n].pop();
              });
            }
          }
        });
        schoolBox.appendChild(box);
      });
    }
  }
  request.open("GET", requestUrl, true);
  request.send();
}