import Router from './router'
import View from "./view";

export default class App {

    constructor(root, routing) {
        this.root = document.getElementById(root);
        this.router = new Router(document.getElementById(routing));
        this.view = new View(this.root);

        this.router.bootstrap();
    }
}