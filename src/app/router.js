import Route from "App/route";

export default class Router {
    routes = [];

    constructor(navigationContainer) {
        this.navigationContainer = navigationContainer;
        this.navigationLinks = navigationContainer.querySelectorAll("a");
    }

    discoverRoutes() {
        return import('Routes').then(storage => {
            Object.entries(storage.default).forEach(([routeName, properties]) => {
                this.routes.push(new Route(routeName, properties));
            });
        });
    }

    get pathname() {
        return window.location.pathname;
    }

    listen() {
        window.addEventListener('popstate', () => {
            this.navigate(this.pathname);
        });
    }

    attachNavigationEvent() {
        this.navigationContainer.addEventListener('click', (event) => {

            if (event.target.matches('a')) {
                event.preventDefault();
                const href = event.target.href;

                window.history.pushState(null, null, href);
                this.navigate(new URL(href).pathname);
                this.highlightCurrentRoute();
            }
        });
    }

    navigate(href) {
        const route = this.routes.find(route => route.path === href);

        if (! route) {
            console.error("Route not found!", href);

            this.navigate('/404');

            return;
        }

        const [controllerName, method] = route.controller;

        import(`Controllers/${controllerName}.controller`).then(module => {
            const controller = new module.default();

            document.title = controllerName[0].toUpperCase() + controllerName.slice(1);
            controller[method]();
        })
    }

    highlightCurrentRoute() {
        this.navigationLinks.forEach((link) => {
            link.parentElement.classList.remove("active");

            if (new URL(link.href).pathname === this.pathname) {
                link.parentElement.classList.add("active");
            }
        });
    }

    bootstrap() {
        this.discoverRoutes().then(() => {
            this.attachNavigationEvent();
            this.listen();

            this.navigate(this.pathname);
            this.highlightCurrentRoute();
        });
    }
}