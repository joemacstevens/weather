import React, {Component} from 'react';
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {address: '', city:''}
    }
    
    handleChange = address => {
        this.setState({ address });
    }

    updateName = name => {
        this.setState({city: name});
    }

    handleSelect = address => {
        geocodeByAddress(address)
        .then(results => {
            this.updateName(results[0].formatted_address)
            return getLatLng(results[0])
        })
        .then(latlng => this.props.location(latlng))
        .catch(error => console.error('Error', error));
    }

    searchInput(props){
        return (
            <PlacesAutocomplete 
                value={this.state.address}
                searchOptions={{type:['cities']}}
                onChange={this.handleChange}
                onSelect={this.handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <nav className="search-input">
                    <input {...getInputProps({
                        className: "search-input",
                        placeholder: "Search For Your City" 
                    })}/>
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        return (
                        <div
                        {...getSuggestionItemProps(suggestion, {
                        className
                        })}
                        >
                        <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                    </nav>
                )}
            </PlacesAutocomplete>

        )
    }

    locationName(props){
        return(
            <header className="location" onClick={event => this.props.update()}>
                <button className="search-trigger"><img className="icon" src="images/search-location.svg" alt="" /></button>
                <span className="location-name">{this.props.city}</span>
            </header>
        )
    }

    render() {
       if(this.props.search){
          
        return (
            this.locationName()  
     )
       } else {
        return (
            
            this.searchInput()  
     )
       }

    }
}

export default Search