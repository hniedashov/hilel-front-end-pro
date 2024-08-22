export default class Route {
    constructor(name, properties) {
        this.name = name;

        [this.path, this.controller] = properties;
    }
}