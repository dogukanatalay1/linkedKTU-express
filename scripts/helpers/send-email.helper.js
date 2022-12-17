const eventEmitter = require('../../events/event-emitter.event');

const sendEmail = (email, fullName, password) => {
    eventEmitter.emit('send_email', {
        to: email,
        subject: 'linkedKTU verification',
        template: 'student-password-template',
        context: {
            fullName: fullName,
            password: password,
        },
    });
};

module.exports = { sendEmail };
