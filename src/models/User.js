class User {
    constructor(id, name, roomId) {
        this.id = id;
        this.name = name;
        this.roomId = roomId;
        this.messages = [];
        this.isAlive = true;
    }

    addMessage(message) {
        this.messages.push(message);
    }

    setAliveStatus(status) {
        this.isAlive = status;
    }
}

module.exports = User;
