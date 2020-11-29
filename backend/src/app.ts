import express from 'express';
import mariadb from 'mariadb';
import { Server } from 'typescript-rest';
import { ProductService } from './product';
import { StoreService } from './store';
import { UserService } from './user';

const app = express();
Server.buildServices(app, ProductService, StoreService, UserService);
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	password: 'myPassword',
	connectionLimit: 5,
});

server.start().then(function () {
	console.log('Sucessfully started server');
});
