import { OnelinerView } from "./Modules/Oneliner/onelinerView.js";

export class Dashboard {

    constructor(root) {
        this.root = root;
        this.main = null;
    }

    render() {
        this.root.innerHTML = "";

        this.createSidebar();
        this.createMain();

        this.showPlaceholder("Vælg et punkt i menuen.");
    }

    createSidebar() {
        const sidebar = document.createElement("nav");
        sidebar.classList.add("sidebar");

        const ul = document.createElement("ul");

        const tabs = [
            { name: "Oneliners", action: () => this.showOneliners() },
            { name: "Book telefontid", action: () => this.showPlaceholder("Book telefontid") },
            { name: "TBA 2", action: () => this.showPlaceholder("TBA 2") },
            { name: "TBA 3", action: () => this.showPlaceholder("TBA 3") }
        ];

        tabs.forEach(tab => {
            const li = document.createElement("li");
            li.textContent = tab.name;

            li.addEventListener("click", () => {
                document.querySelectorAll(".sidebar li")
                    .forEach(item => item.classList.remove("active"));

                li.classList.add("active");
                tab.action();
            });

            ul.appendChild(li);
        });

        sidebar.appendChild(ul);
        this.root.appendChild(sidebar);
    }

    createMain() {
        this.main = document.createElement("div");
        this.main.classList.add("main");
        this.root.appendChild(this.main);
    }

    showOneliners() {
        this.main.innerHTML = "";
        const view = new OnelinerView(this.main);
        view.render();
    }

    showPlaceholder(text) {
        this.main.innerHTML = "";
        const h2 = document.createElement("h2");
        h2.textContent = text;
        this.main.appendChild(h2);
    }
}
