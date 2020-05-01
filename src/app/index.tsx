import { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import AppRouter from 'Route/.';

class App extends PureComponent {
    render() {
        return (
            <AppRouter/>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
