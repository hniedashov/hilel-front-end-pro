import View from "App/view";

export default class HomeController {
    index() {
        View.render('home', {
            message: "Home page",
        });
    }

    edit() {
        console.log('Edit HomeController');
    }
}