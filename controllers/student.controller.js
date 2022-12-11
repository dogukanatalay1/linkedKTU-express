const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../scripts/responses/error/api-error');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const { getOneByQuery, updateByQuery, getAll } = require('../services/base-service');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');
const StudentModel = require('../models/student.model');

const login = async (req, res) => {

  const student = await getOneByQuery(StudentModel, {
    email: req.body.email,
  });

  if (student <= 0) {
    const error = new ApiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
    throw Error(error);
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    student.password,
  );

  if (!validPassword) {
    const error = new ApiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
    throw Error(error);
  }

  const access_token = createLoginToken(student, res);

  new ApiDataSuccess('Login succesfull', httpStatus.OK, res, access_token)
};

const students = [
  {
    id: 0,
    email: 'dogukanatalay46@gmail.com',
    name: 'Doğukan Atalay',
    description: 'Vue and Nodejs developer',
    image: 'https://media-exp1.licdn.com/dms/image/D4D03AQHwjZudYwrfjw/profile-displayphoto-shrink_800_800/0/1665486077397?e=1675296000&v=beta&t=4M3CiuO43MgEXRUQ_CXq-axqz3sPUTnsvgqvuEommI8',
    ContactInfo: {
      id: 0,
      email: 'dogukanatalay46@gmail.com',
      phone: '0538 427 2743',
      address: 'Trabzon kanuni kampüsü, kanuni yurdu',
    },
    school: 'KTU',
    city: 'Trabzon',
    technologies: ['JS', 'Express.js', 'Vue.js', 'MongoDB', 'MySQL'],
    lecturersThatApproved: null,
  },
  {
    id: 1,
    email: 'ertbil@gmail.com',
    name: 'Ertuğrul Bilgiç',
    description: 'Flutter dev and GDSC Lead',
    image: 'https://media-exp1.licdn.com/dms/image/C4E03AQGOBhpgEqEAsg/profile-displayphoto-shrink_800_800/0/1634920916672?e=1675296000&v=beta&t=vkJa3d8aSRbdIOmZmI8tTAf8tyhEkgEIqeMP0NYdU6I',
    ContactInfo: {
      id: 1,
      email: 'ertbil@gmail.com',
      phone: '0538 427 2743',
      address: 'Trabzon kanuni kampüsü, kanuni yurdu',
    },
    school: 'KTU',
    city: 'Trabzon',
    technologies: ['Flutter', 'Dart', 'Java', 'MySQL'],
    lecturersThatApproved: null,
  },
  {
    id: 2,
    email: 'yavuz@gmail.com',
    name: 'Yavuz Haliloğlu',
    description: 'Embedded System engineer and Frontend Dev.',
    image: 'https://media-exp1.licdn.com/dms/image/C5603AQF63OAAfUcrcw/profile-displayphoto-shrink_800_800/0/1648034235334?e=1675296000&v=beta&t=wwGIbsiCRdTwi3Bh7fU87Im9Cy7CIvF4yrfit_QR53U',
    ContactInfo: {
      id: 2,
      email: 'yavuz@gmail.com',
      phone: '0538 427 2743',
      address: 'Trabzon kanuni kampüsü, kanuni yurdu',
    },
    school: 'KTU',
    city: 'Trabzon',
    technologies: ['C', 'C++', 'FPGA', 'Vue.js'],
    lecturersThatApproved: null,
  },
  {
    id: 3,
    email: 'mert@gmail.com',
    name: 'Mert Kaya',
    description: 'Django and Nodejs developer',
    image: 'https://media-exp1.licdn.com/dms/image/C4D03AQGsIwvmP2OFsw/profile-displayphoto-shrink_800_800/0/1661778603167?e=1675900800&v=beta&t=F5MuE_dJryG67vau04EvY2SeSsk9o_2J_wqIxt-L5xY',
    ContactInfo: {
      id: 3,
      email: 'mert@gmail.com',
      phone: '0538 427 2743',
      address: 'Trabzon kanuni kampüsü, kanuni yurdu',
    },
    school: 'KTU',
    city: 'Trabzon',
    technologies: ['Django', 'Python', 'Node.js'],
    lecturersThatApproved: null,
  },
  {
    id: 4,
    email: 'musti@gmail.com',
    name: 'Mustafa Yılmaz',
    description: 'Web scraping and automationg and Node.js',
    image: 'https://media-exp1.licdn.com/dms/image/C4D03AQGx5GQab_0fmw/profile-displayphoto-shrink_800_800/0/1659616405596?e=1675900800&v=beta&t=ol8uGrig0GoVVKn5WDpMdrzfIxb_IMTVuq0abTXAfY4',
    ContactInfo: {
      id: 4,
      email: 'musti@gmail.com',
      phone: '0538 427 2743',
      address: 'Trabzon kanuni kampüsü, kanuni yurdu',
    },
    school: 'KTU',
    city: 'Trabzon',
    technologies: ['Django', 'Python', 'Node.js'],
    lecturersThatApproved: null,
  },
  {
    id: 5,
    email: 'can@gmail.com',
    name: 'Can Altun',
    description: 'Network security engineer',
    image: 'https://media-exp1.licdn.com/dms/image/C4D03AQFoR0nuJZdcIw/profile-displayphoto-shrink_800_800/0/1614208527749?e=1675900800&v=beta&t=1PRhn1dQJaC0ncfhwq9KzR1M_x7x9MmY_V5hqPbrKbs',
    ContactInfo: {
      id: 5,
      email: 'can@gmail.com',
      phone: '0538 427 2743',
      address: 'Trabzon kanuni kampüsü, kanuni yurdu',
    },
    school: 'KTU',
    city: 'Trabzon',
    technologies: ['Network', 'Siber security', 'Linux'],
    lecturersThatApproved: null,
  },
  {
    id: 6,
    email: 'ismail@gmail.com',
    name: 'İsmail Uçuran',
    description: 'AI-ML Engineer',
    image: ' https://media-exp1.licdn.com/dms/image/C4D03AQEyQojpUu65wQ/profile-displayphoto-shrink_800_800/0/1651945008532?e=1675900800&v=beta&t=9UVg0ioUn8awumgS75Dx6Q7q0KF7Pz_3STkb_VFqppY',
    ContactInfo: {
      id: 6,
      email: 'ismail@gmail.com',
      phone: '0538 427 2743',
      address: 'Trabzon kanuni kampüsü, kanuni yurdu',
    },
    school: 'KTU',
    city: 'Trabzon',
    technologies: ['Python', 'AI', 'Tensorflow'],
    lecturersThatApproved: null,
  },
  {
    id: 7,
    email: 'eren@gmail.com',
    name: 'Eren Kalfa',
    description: 'Unity Developer',
    image: 'https://media-exp1.licdn.com/dms/image/C4D03AQGIyWTa6oLvRw/profile-displayphoto-shrink_800_800/0/1659091368252?e=1675900800&v=beta&t=rAmAqn60m9SZ2LrTh9gM5SlPAJADDjm7wudZksAhflk',
    ContactInfo: {
      id: 7,
      email: 'eren@gmail.com',
      phone: '0538 427 2743',
      address: 'Trabzon kanuni kampüsü, kanuni yurdu',
    },
    school: 'KTU',
    city: 'Trabzon',
    technologies: ['Unity', 'C#', 'SQL'],
    lecturersThatApproved: null,
  },
  {
    id: 8,
    email: 'billy@gmail.com',
    name: 'Bill Gates',
    description: 'Owner - Microsoft',
    image: 'https://en.wikipedia.org/wiki/Bill_Gates#/media/File:Bill_Gates_2017_(cropped).jpg',
    ContactInfo: {
      id: 8,
      email: 'billy@gmail.com',
      phone: '0538 427 2743',
      address: 'Trabzon kanuni kampüsü, kanuni yurdu',
    },
    school: 'KTU',
    city: 'Trabzon',
    technologies: ['Windows', 'Software Development', 'Lots of money'],
    lecturersThatApproved: null,
  },
  {
    id: 9,
    email: 'elon@gmail.com',
    name: 'Elon Musk',
    description: 'Genius - Historical Troll',
    image: 'https://ichef.bbci.co.uk/news/800/cpsprodpb/512b/live/b8436540-56b4-11ed-ae8c-638f0fbfa673.jpg',
    ContactInfo: {
      id: 9,
      email: 'billy@gmail.com',
      phone: '0538 427 2743',
      address: 'Trabzon kanuni kampüsü, kanuni yurdu',
    },
    school: 'KTU',
    city: 'Trabzon',
    technologies: ['Lots of money'],
    lecturersThatApproved: null,
  }
];

getStudents = (req, res) => {
  new ApiDataSuccess('Students fetched succesfully', httpStatus.OK, res, students)
};

getStudent = (req, res) => {
  const { id } = req.params;

  const student = students.find((student) => id == student.id);

  if (!student) {
    const error = new ApiError(`There is no student with this id: ${id}`, httpStatus.BAD_REQUEST, res);
    throw Error(error);
  }

  new ApiDataSuccess('Student with given id found', httpStatus.OK, res, student);
};

searchStudentsBySkill = (students, skill) => {
  const lowerCaseSkill = skill.toLowerCase();

  return students.filter(student => {
    return student.technologies
      .some(technology => technology.toLowerCase().includes(lowerCaseSkill));
  });
}

getStudentsBySkill = (req, res) => {
  const { skill } = req.params

  let studentsWithGivenSkill = searchStudentsBySkill(students, skill)

  if (!studentsWithGivenSkill.length) {
    const error = new ApiError(`There is no student with given skill ${skill}`, httpStatus.BAD_REQUEST, res);
    throw Error(error)
  }

  new ApiDataSuccess('Students with given skill found', httpStatus.OK, res, studentsWithGivenSkill)
}

deneme = async (req, res) => {
  const result = await getAll()

  console.log(result)

  res.status(200).json({
    result
  })
}

module.exports = { login, getStudents, getStudent, getStudentsBySkill, deneme };
