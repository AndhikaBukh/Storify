class Auth {
    // public
    user;

    // set Auth
    static set(user) {
        this.user = user;
    }

    // update user
    static async update(data) {
        const propsName = Object.getOwnPropertyNames(data);

        propsName.forEach((prop) => {
            if (data[`${prop}`] != undefined) {
                this.user[`${prop}`] = data[`${prop}`];
            }
        });
    }

    static async save() {
        await this.user.save();
    }
}
module.exports = Auth;
