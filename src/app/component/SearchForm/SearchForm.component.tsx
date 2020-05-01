import { PureComponent } from 'react';

class SearchForm extends PureComponent<{
    handlePlaceInput: Function,
    apiResponses: Object
}, {}> {
    render() {
        const {
            handlePlaceInput,
            apiResponses
        } = this.props;

        return(
            <div className="searchForm">
                <h3>Find a place and time to meet!</h3>

                <p>Where are you located?</p>
                <div className="searchForm__hintWrapper">
                    <div className="searchForm__origin1-hint">
                        {/* { apiResponses.origin1[0] } */}
                    </div>
                    <input onInput={ (event) => handlePlaceInput(event) } name="origin1" />
                </div>

                <p>Where is your travel partner located?</p>
                <input onInput={ (event) => handlePlaceInput(event) } name="origin2" />

                <p>Where would you like to go?</p>
                <input onInput={ (event) => handlePlaceInput(event) } name="destination" />
            </div>
        );
    }
}

export default SearchForm;