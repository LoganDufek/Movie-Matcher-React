import { React, useState } from 'react';
import ActorSearch from '../components/ActorSearch';
import { Card } from 'antd';
import MovieSearch from '../components/MovieSearch';

function HomePage() {


    return (
        <main>

            <Card className="actor-container" bordered={true} >
                <ActorSearch></ActorSearch>

            </Card>

            <Card className="actor-container" bordered={true} >
                <MovieSearch></MovieSearch>

            </Card>



        </main >
    )

}

export default HomePage;