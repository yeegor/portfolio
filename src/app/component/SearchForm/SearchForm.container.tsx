import { PureComponent } from 'react'

import SearchForm from './SearchForm.component';

class SearchFormContainer extends PureComponent {
    state = {
        apiResponses: {
            origin1: {},
            origin2: {},
            destination: {}
        }
    };

    handlePlaceInput = (event : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = (event.target);
        const { apiResponses } = this.state;

        if (value.length < 2) return;

        // Fetch potential place list
        fetch(`${process.env.API_ENDPOINT}/places/${value}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    apiResponses: {
                        ...apiResponses,
                        [name]: data.Places
                    }
                });
            });
    };

    // TODO figure out `this` in {}
    containerFunctions = () => {
        const { handlePlaceInput } = this;
        return {
            handlePlaceInput
        };
    };

    render() {
        return (
            <SearchForm
              { ...this.containerFunctions() }
              { ...this.state }
            />
        );
    }
}

export default SearchFormContainer;