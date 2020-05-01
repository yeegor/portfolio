import { PureComponent } from 'react';
import SearchForm from 'Component/SearchForm';

class HomePage extends PureComponent {
    render() {
        return (
            <div>
                <h1>Homepage!</h1>
                <SearchForm />
            </div>
        );
    }
}

export default HomePage;