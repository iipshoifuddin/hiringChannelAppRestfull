# Hirring Channels ( BackEnd )

Hirring Channels is an application created for the purpose of facilitating job seekers and employers, where job seekers and employers only register in this application and find their respective matches, without having to meet in an even.


## pre-Instalation

before installing this application, first install Node JS

_https://nodejs.org/en/download/



second create tables in your database like this :
```PHP
CREATE TABLE `chat` (
  `id` varchar(79) NOT NULL,
  `sender` varchar(79) NOT NULL,
  `receiver` varchar(79) NOT NULL,
  `message` varchar(500) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `tb_companies` (
  `id` varchar(70) NOT NULL,
  `name` varchar(79) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `location` varchar(500) NOT NULL,
  `description` varchar(550) NOT NULL,
  `phonenumber` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(79) NOT NULL,
  `privilegelevels` varchar(20) DEFAULT 'company',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `tb_engineers` (
  `id` varchar(74) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(400) NOT NULL,
  `skill` varchar(30) NOT NULL,
  `location` varchar(500) NOT NULL,
  `dateofbrith` varchar(12) NOT NULL,
  `phonenumber` varchar(50) NOT NULL DEFAULT '081905678123',
  `showcase` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL DEFAULT '12345',
  `privilegelevels` varchar(20) DEFAULT 'engineer',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

```


## Installation

OS X & Linux & Windows:

```sh
npm init
```

```sh
npm install
```

## Development setup

Before using this application, first enter the project folder _your_project and create a dotEnv file:

Linux :
```sh
cp example.ENV .ENV
```

Windows :
```sh
copy example.ENV .ENV /a
```

then edit the file as follows :
```sh
DB_HOST = YOUR_HOSTNAME
DB_USER = YOUR_USER
DB_PASSWORD = YOUR_PASSWORD
DB_NAME = YOUR_DB_NAME

PORT = 4000
JWT_KEY = secretkey
SHIPMENT_KEY = {cek di api key eksternal}

```


## RUNNING

To run this application, you must run the following command :

```sh
npm start
```

## USE ENDPOINT

To use json from a database, use the endpoints as follows :

```sh
  //Routing engineers
  // Get Data Engineers All filed (Using 'Get' Header)
'http://YOUR_SERVER:3000/engineers/users'

  // Get Data Engineers One Field (Using 'Get' Header)
'http://YOUR_SERVER:3000/engineers/user/:id'

  // Add Data Enginners (Using 'Post' Header)
'http://YOUR_SERVER:3000/engineers/user'
  
  // Edit Data Engineers  (Using 'Patch' Header)
'http://YOUR_SERVER:3000/engineers/user/:id'
  
  //Delete Data Engineers (Using 'Delete' Header)
'http://YOUR_SERVER:3000/engineers/user/:id'

  //login Auth (Using 'Post' Header)
'http://YOUR_SERVER:3000/login'

  //Verify Login (Using 'Get' Header)
'http://YOUR_SERVER:3000/secret'


  //Router Companies
// Get Data Engineers All filed (Using 'Get' Header)
'http://YOUR_SERVER:3000/companies/users'

// Get Data Engineers One Field (Using 'Get' Header)
'http://YOUR_SERVER:3000/companies/user/:id'

// Add Data Enginners (Using 'Post' Header)
'http://YOUR_SERVER:3000/companies/user/:id'

// Edit Data Engineers (Using 'Patch' Header)
'http://YOUR_SERVER:3000/companies/user/:id'

// Delete Data Engineers (Using 'Delete' Header)
'http://YOUR_SERVER:3000/companies/user/:id'


// Get Global API (Using 'Get' Header)
'http://YOUR_SERVER:3000/global/:user/:id'
  
```
