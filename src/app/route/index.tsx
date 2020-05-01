import { PureComponent, cloneElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import HomePage from 'Route/HomePage';

enum RouterBlockType {
    before = 'BEFORE',
    switch = 'SWITCH',
    after = 'AFTER'
}

type RouteItem = {
    component: React.ComponentElement<any, any>,
    position: number
}

export const history = createBrowserHistory({ basename: '/' });

class AppRouter extends PureComponent {
    readonly [RouterBlockType.before] : RouteItem[] = [];

    readonly [RouterBlockType.switch] : RouteItem[] = [
        {
            component: <Route path='/' exact component={ HomePage }/>,
            position: 10
        }
    ];

    readonly [RouterBlockType.after] : RouteItem[] = [];

    getSortedItems(type : RouterBlockType) : React.ComponentElement<any, any>[] {
        return (this[type] || []).reduce(
            (acc, { component, position }) => {
                if (!component) {
                    console.warn('There is an item without a component property declared in main router');
                    return acc;
                }
                if (acc[position]) {
                    console.warn(`There is already an item with ${ position } declared in router.`)
                    return acc;
                }

                acc[position] = component;
                return acc;
            }, [] as React.ComponentElement<any, any>[]
        );
    }

    renderItemsOfType(type: RouterBlockType) {
        return Object.entries(this.getSortedItems(type)).map(
            ([key, component]) => cloneElement(component, { key })
        );
    }

    renderRouterContent() {
        return (<>
            { this.renderItemsOfType(RouterBlockType.before) }
            <Switch>
                { this.renderItemsOfType(RouterBlockType.switch) }
            </Switch>
            { this.renderItemsOfType(RouterBlockType.after) }
        </>)
    }

    render() {
        return (
            <Router history={ history }>
                { this.renderRouterContent() }
            </Router>
        )
    }
}

export default AppRouter;