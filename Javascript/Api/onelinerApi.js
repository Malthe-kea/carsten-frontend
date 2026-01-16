const BASE_URL = "http://localhost:8080/api/oneliners";

export class OneLinerApi {

    static async getAll() {
        const res = await fetch(BASE_URL);
        return res.json();
    }

    static async create(oneLiner) {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(oneLiner)
        });

        return res.json();
    }

    static async delete(id) {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        });
    }
}
