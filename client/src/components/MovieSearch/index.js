import { React, useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';

function MovieSearch() {

    const [movie, setMovie] = useState('');
    const [year, setYear] = useState('');
    const [gross, setGross] = useState('');
    const [director, setDirector] = useState('');
    const [starActors, setStarActors] = useState('');
    const [rottenTomatoes, setRottenTomatoes] = useState('');
    const [posterForMovie, setPosterForMovie] = useState('');

    const handleMovie = event => {
        const { value } = event.target;

        setMovie(value)


        console.log(movie)

    };

    function getMovieInfo() {



        fetch(
            "https://www.omdbapi.com/?t=" + movie + "&apikey=d86e2804"
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {

                console.log(response)

                setYear(response.Year)
                setDirector(response.Director)
                setGross(response.BoxOffice)
                setStarActors(response.Actors)
                setRottenTomatoes('🍅🍅' + response.Ratings[1].Value + '🍅🍅')
                setPosterForMovie(response.Poster)

            })
    }



    return (
        <div>

            <Form className="actor-form"

                layout="horizontal">
                <p> Find Info About a Movie! </p>
                <Form.Item  >

                </Form.Item>
                <Form.Item name="movie" className="movie-label">
                    <Input className="movie-one" placeholder="eg. The Matrix" onChange={handleMovie} />
                </Form.Item>
                <Form.Item >
                    <button className="actor-button" type="primary" onClick={getMovieInfo}>Search!</button>
                </Form.Item>
            </Form>
            {!year ? <div></div> :
                <div className="movie-info">
                    <img src={posterForMovie}></img>
                    <p>
                        Year Released: {year}
                    </p>
                    <p>
                        Directed By: {director}
                    </p>
                    <p>
                        Domestic Box Office: {gross}
                    </p>
                    <p>
                        Starring: {starActors}
                    </p>
                    <p>
                        Rotten Tomates: {rottenTomatoes}
                    </p>
                </div>
            }

        </div>
    )
}

export default MovieSearch;
