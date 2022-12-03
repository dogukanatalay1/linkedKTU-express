const httpStatus = require('http-status');
// const bcrypt = require('bcryptjs');
const ApiError = require('../scripts/responses/error/api-error');
const ApiSuccess = require('../scripts/responses/success/api-success');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const { getOneByQuery, updateByQuery } = require('../services/base-service');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');
const StudentModel = require('../models/student.model')

const login = async (req, res) => {
    console.log(req.body);

    const student = await getOneByQuery(StudentModel, {
        email: req.body.email,
    });

    if (student <= 0) {
        const error = new ApiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
        res.send(error)
        throw Error(error);
    }

    // const validPassword = await bcrypt.compare(
    //     req.body.password,
    //     student.password
    // );

    // if (!validPassword) {
    //     const error = new ApiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res).toJSON();
    //     res.send(error)
    //     throw Error(error);
    // }

    // ? Create And Assign A Token
    // const token = createLoginToken(student, res);
    // await ???

    const success = new ApiDataSuccess(
        'Login Success',
        // { access_token: token },
        { access_token: 'dasdsa' },
        true,
        httpStatus.OK,
        res
    )
    success.send()
};

let students = [
    {
        id: 0,
        email: 'dogukanatalay46@gmail.com',
        password: '1234',
        name: 'dgosu',
        description: 'Sr. Backend dev. at Teknasyon, author in Udemy',
        image: 'https://media-exp1.licdn.com/dms/image/D4D03AQHwjZudYwrfjw/profile-displayphoto-shrink_800_800/0/1665486077397?e=1675296000&v=beta&t=4M3CiuO43MgEXRUQ_CXq-axqz3sPUTnsvgqvuEommI8',
        ContactInfo: {
            id: 0,
            email: 'dogukanatalay46@gmail.com',
            phone: '0538 427 2743',
            address: 'Trabzon kanuni kampüsü, kanuni yurdu'
        },
        school: 'KTU',
        city: 'Trabzon',
        technologies: ['JS', 'Express.js', 'Vue.js', 'MongoDB'],
        lecturersThatApproved: null
    },
    {
        id: 1,
        email: 'ertbil@gmail.com',
        password: '1234',
        name: 'ertbil',
        description: 'Sr. Flutter dev. and Algoritm expert at DeutchCode',
        image: 'https://media-exp1.licdn.com/dms/image/C4E03AQGOBhpgEqEAsg/profile-displayphoto-shrink_800_800/0/1634920916672?e=1675296000&v=beta&t=vkJa3d8aSRbdIOmZmI8tTAf8tyhEkgEIqeMP0NYdU6I',
        ContactInfo: {
            id: 1,
            email: 'ertbil@gmail.com',
            phone: '0538 427 2743',
            address: 'Trabzon kanuni kampüsü, kanuni yurdu'
        },
        school: 'KTU',
        city: 'Trabzon',
        technologies: ['flutter', 'dart', 'Java', 'leetcode'],
        lecturersThatApproved: null
    },
    {
        id: 2,
        email: 'yavuz@gmail.com',
        password: '1234',
        name: 'yavuz',
        description: 'Sr. Embedded System engineer at Siemens',
        image: 'https://media-exp1.licdn.com/dms/image/C5603AQF63OAAfUcrcw/profile-displayphoto-shrink_800_800/0/1648034235334?e=1675296000&v=beta&t=wwGIbsiCRdTwi3Bh7fU87Im9Cy7CIvF4yrfit_QR53U',
        ContactInfo: {
            id: 2,
            email: 'yavuz@gmail.com',
            phone: '0538 427 2743',
            address: 'Trabzon kanuni kampüsü, kanuni yurdu'
        },
        school: 'KTU',
        city: 'Trabzon',
        technologies: ['C', 'C++', 'FPGA'],
        lecturersThatApproved: null
    }
]

getAllStudents = (req, res) => {
    res.status(200).json(students)
}

getStudent = (req, res) => {
    const { id } = req.params

    const student = students.find((student) => id == student.id)

    if(!student) {
        return res.status(404).json({
            message: `there is no student with this id: ${id}`,
            success: false
        })
    }

    res.status(200).send(student)
}

module.exports = { login, getAllStudents, getStudent }
