CREATE DATABASE cadastro ;

USE cadastro ;

CREATE TABLE user(
id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
tipoCadastro VARCHAR(255) NOT NULL,
nome VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
prof VARCHAR(255),
descricao VARCHAR(255),
tel int(111)
);