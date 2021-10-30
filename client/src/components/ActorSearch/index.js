import { React, useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';


function ActorSearch() {

    const [actorOne, setActorOne] = useState('');
    const [actorTwo, setActorTwo] = useState('');
    const moviePoster = []
    const [card, setCard] = useState()
    const [images, setImages] = useState([])

    const handleChange1 = event => {
        const { value } = event.target;

        setActorOne(value)


        console.log(actorOne)

    };

    const handleChange2 = event => {
        const { value } = event.target;


        setActorTwo(value)


        console.log(actorTwo)
    };

    var filmArray1 = [];
    var filmArray2 = [];
    var finalResults = [];



    function searchActors() {
        //user responses, set as defined strings currently but will be set to take in values based on what the user types in
        setCard('True')
        setImages([])
        //inital fetch request for the first actor, retrieves Imdb ID data to then be used 
        fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" + actorOne + "/", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            }
        }).then(function (response) {
            return response.json();
        })
            //taking that initial fetch, logging data as a variable and then passing it to the next fetch request
            .then(function (response) {
                console.log(response)
                let ActorID = response.results[0].imdb_id


                fetch("https://data-imdb1.p.rapidapi.com/actor/id/" + ActorID + "/all_roles/", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
                        "x-rapidapi-host": "data-imdb1.p.rapidapi.com"
                    }
                }).then(response => {
                    return response.json();
                })
                    //build an array from the desired data for the first actor, to be checked with the next array
                    .then(function (response) {
                        console.log(response)
                        for (var i = 0; i < response.results.length; i++) {
                            if (filmArray1.includes(response.results[i][0].title) === false) {
                                filmArray1.push(response.results[i][0].title)

                            }
                        } checkSecondActor(actorTwo);
                    }).catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
                // var noPoster = document.createElement("img")
                // noPoster.setAttribute("src", "./assets/images/MovieMongoose2.png")
                // posterDisplay.appendChild(noPoster)
            });
    }

    function checkSecondActor(actorTwo) {


        //Second series of fetch requests for the second entered actor
        fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" + actorTwo + "/", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            }
        })
            .then(function (response) {
                return response.json();
            })

            //same as the previous fetch request where we store the relevant data to then be used
            .then(function (response) {
                let ActorID = response.results[0].imdb_id
                console.log(response)


                fetch("https://data-imdb1.p.rapidapi.com/actor/id/" + ActorID + "/all_roles/", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
                        "x-rapidapi-host": "data-imdb1.p.rapidapi.com"
                    }
                })
                    .then(response => {
                        return response.json();
                    })
                    //build an array from the desired data for the second actor, to be checked with the first array
                    .then(function (response) {

                        for (var i = 0; i < response.results.length; i++) {
                            if (filmArray2.includes(response.results[i][0].title) === false) {
                                filmArray2.push(response.results[i][0].title)

                            }
                        }
                        //pushes the films the two actors have in common to a new array
                        for (var j = 0; j < filmArray2.length; j++) {

                            if (filmArray1.includes(filmArray2[j])) {
                                finalResults.push(filmArray2[j])
                            }
                            else {
                                console.log("no match")
                            }
                        }
                        console.log(filmArray1)
                        console.log(filmArray2)
                        console.log(finalResults)

                        if (finalResults.length === 0) {

                            // var noPoster = document.createElement("img")
                            // noPoster.setAttribute("src", "./assets/images/MovieMongoose.png")
                            // posterDisplay.appendChild(noPoster)
                        }
                        //for loop to iterate through this created array and retrieve the poster data from a new API
                        for (i = 0; i < finalResults.length; i++) {
                            const matchedMovie = finalResults[i]



                            fetch("https://www.omdbapi.com/?s=" + matchedMovie + "&apikey=d86e2804")
                                .then(function (response) {
                                    return response.json();
                                })
                                .then(function (response) {


                                    setImages(images => [...images, response.Search[0].Poster])



                                });


                        }; console.log(images)
                    })
            })
            .catch(err => {
                console.error(err);

                // var noPoster = document.createElement("img")
                // noPoster.setAttribute("src", "./assets/images/MovieMongoose2.png")
                // posterDisplay.appendChild(noPoster)
            });
    }


    var img = images.map(function (image) {
        return (<img className="movie-poster" src={image} />);
    });


    return (
        <div>

            <Form className="actor-form"

                layout="horizontal">
                <p> Enter the Names of the Actors you want to Compare</p>
                <Form.Item  >

                </Form.Item>
                <Form.Item label="First Actor" name="actorOne" className="actor-label">
                    <Input className="actor-one" placeholder="eg. Tom Hanks" onChange={handleChange1} />
                </Form.Item>
                <Form.Item label="Second Actor" name="actorTwo" className="actor-label">
                    <Input className="actor-one" placeholder="eg. Tim Allen" onChange={handleChange2} />
                </Form.Item>
                <Form.Item >
                    <button className="actor-button" type="primary" onClick={searchActors}>Search!</button>
                </Form.Item>
            </Form>
            {!card ? <div></div> :
                <div className="poster-container">
                    {img}
                </div>
            }
        </div >
    )

}

export default ActorSearch;