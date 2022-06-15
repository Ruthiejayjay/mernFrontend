import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import PlaceItem from './PlaceItem'
import './PlaceList.css'

const PlaceList = props => {
    if (props.items.length === 0) {
        return (
            <div className='place-list center'>
                <Card>
                    <h2>No Places Found. Maybe Create one</h2>
                    <button>Share Place</button>
                </Card>
            </div>
        );
    }

    return <ul className='place-list'>
        {props.items.map(place => <PlaceItem 
        key={place.id}
        id={place.id}
        image={place.imageUrl}
        title={place.title}
        address={place.address}
        description={place.decription}
        creator={place.creator}
        coordinates={place.location}
        />
        )}
    </ul>
}

export default PlaceList
