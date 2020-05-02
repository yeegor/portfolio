import { PureComponent } from 'react';

import './HomePage.style'

class HomePage extends PureComponent {
    renderWelcomeText() {
        return (
            <p className="HomePage-WelcomeText">
                Mostly self-learning second year software engineering student.
                Web development for fun and money.
            </p>
        )
    }

    renderWelcomeHeading() {
        return (
            <h1 className="HomePage-WelcomeHeading">
                Yegor Batov
            </h1>
        );
    }

    render() {
        return (
            <div className="HomePage">
                <div className="HomePage-Welcome">
                    { this.renderWelcomeHeading() }
                    { this.renderWelcomeText() }
                </div>
            </div>
        );
    }
}

export default HomePage;