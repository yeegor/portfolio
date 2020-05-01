import { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import AppRouter from 'Route/.';
import 'Style/main'

class App extends PureComponent {
    render() {
        return (
            <AppRouter/>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
