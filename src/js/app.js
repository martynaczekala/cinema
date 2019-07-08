//getting data and selecting city
var cin_data = JSON.parse(cinema_data);
var cities = Object.keys(cin_data).length;
var dropdown = document.getElementById('citSelect');

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose City';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

for (let i = 0; i < cities; i++) {
    var option = document.createElement('option');
    option.text = cin_data[i].city;
    option.value = cin_data[i].city;
    dropdown.add(option);
}

function selectCity() {
    var x = document.getElementById("citSelect").value;
    document.getElementById("demo").innerHTML = "You selected: " + x;
    document.getElementById("booking").classList.remove("hidden");
    ///movies list after selection
    for (let i = 0; i < cities; i++) {
        if (x == cin_data[i].city) {
            var movies = cin_data[i].movies;

            if (document.getElementById('moviesList').innerHTML.trim().length == 0) {
                movieListCreate();
            }
            else {
                document.getElementById('moviesList').innerHTML = "";
                document.getElementById('hoursList').innerHTML = "";
                document.getElementById('theater').innerHTML = "";
                document.getElementById("cost").value = "";
                document.getElementById("screen-room").classList.add("hidden");
                document.getElementById("payment").classList.add("hidden");
                setTimeout(movieListCreate, 1000);
            }


            function movieListCreate() {  //creating list of movies
                for (var key in movies) {
                    //var movieName = key;
                    var movieValue = movies[key];
                    var movieElement = document.createElement('li');
                    var movienode = document.createTextNode(key);
                    var movieList = document.getElementById('moviesList');
                    movieElement.appendChild(movienode);
                    movieList.appendChild(movieElement);
                    movieList.appendChild
                    var movieHours = document.createElement('ul');

                    //creating list of hours for movie
                    for (var prop in movieValue) {

                        var hour = document.createElement('li');
                        var button = document.createElement('button');

                        //time comparision     
                        var time = new Date();
                        var now_time = ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2);

                        var regex = new RegExp(':', 'g'),
                        timeStr1 = movieValue[prop];
                        timeStr2 = now_time;
                        if (parseInt(timeStr1.replace(regex, ''), 10) < parseInt(timeStr2.replace(regex, ''), 10)) {
                           
                        } else {
                            //creating buttons
                            button.innerText = movieValue[prop];
                            button.setAttribute('id', movieValue[prop]);
                            button.classList.add('hour_button');
    
                            hour.appendChild(button)
                            movieHours.appendChild(hour);
                            movieHours.setAttribute('id', key);
                            button.addEventListener('click', checkSeats, false);
                        }
                    }

                    var hoursList = document.getElementById('hoursList');
                    hoursList.appendChild(movieHours);
                }
            }

            function checkSeats() {
                if (document.getElementById('theater').innerHTML.trim().length == 0) {
                    createSeats()
                }
                else {
                    document.getElementById('theater').innerHTML = "";
                    document.getElementById("cost").value = "";
                    setTimeout(createSeats, 1500);
                }
            }

            function createSeats() {
                document.getElementById("screen-room").classList.remove("hidden");
                document.getElementById("payment").classList.remove("hidden");
                document.getElementById("screen").classList.remove("hidden");
                //select seat panel
                var rows = cin_data[i].row;
                var seats = cin_data[i].seats;

                for (var j = 0; j < rows; j++) {
                    var row = document.createElement('div');
                    row.setAttribute('class', 'row-seat');
                    for (var k = 0; k < seats; k++) {
                        var seat = document.createElement('span');
                        seat.setAttribute('class', 'seat');
                        var node = document.createTextNode((k+1));
                        seat.appendChild(node);
                        row.appendChild(seat);
                    }

                    var element = document.getElementById("theater");
                    element.appendChild(row)
                }

                //selecting seats and cost summary

                var seat = document.querySelectorAll("div span");
                var sum = 0;
                var ticket = 15;

                seat.forEach(function (element) {
                    element.addEventListener("click", function () {
                        if (element.style.background == "red") {
                            element.style.background = "green";
                            sum = sum - ticket;
                        } else {
                            element.style.background = "red";
                            sum = sum + ticket;
                        };
                        document.getElementById("cost").value = sum + " PLN";
                    })
                });



            }

        }
    }
};


