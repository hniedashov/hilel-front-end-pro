import Handlebars from 'handlebars';

export default class View {
    static root;

    constructor(root) {
        this.constructor.root = root;
    }

    static render(viewName, context) {
        import(`!!raw-loader!Views/${viewName}.hbs`).then((view) => {
            const template = Handlebars.compile(view.default);

            this.root.innerHTML = template(context);
        });
    }
}