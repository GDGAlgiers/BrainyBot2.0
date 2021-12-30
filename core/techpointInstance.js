const path = require('path');


class PrivateTechpoint {
    constructor() {}
}

class Techpoint {
    constructor() {
        throw new Error('Use Techpoint.getInstance()');
    }
    static getInstance() {
        if (!Techpoint.instance) {
            Techpoint.instance = new PrivateTechpoint();
        }
        return Techpoint.instance;
    }
}

module.exports = Techpoint;