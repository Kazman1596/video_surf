import React from "react";
import './SearchBar.css'

class SearchBar extends React.Component {
    state = { term: '' }
    
    onInputChange = (e) => {
        this.setState({ term: e.target.value })
    }
    
    onFormSubmit = (e) => {
        e.preventDefault()

        this.props.onTermSubmit(this.state.term)

        // TO DO: Make sure we call
        //  callback from parent component
    }

    render() {
        return (
            <div className="search-bar">
                <form onSubmit={this.onFormSubmit} className="form">
                    <div className="field">
                        <input 
                            type="text" 
                            placeholder="Seach term here..."
                            value={this.state.term}
                            onChange={this.onInputChange}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar