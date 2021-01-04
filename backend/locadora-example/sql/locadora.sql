/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : 127.0.0.1:3306
 Source Schema         : locadora

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 04/01/2021 14:34:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES (1, 'Ação');
INSERT INTO `category` VALUES (2, 'Aventura');
INSERT INTO `category` VALUES (3, 'Cinema de arte');
INSERT INTO `category` VALUES (4, 'Chanchada');
INSERT INTO `category` VALUES (5, 'Comédia');
INSERT INTO `category` VALUES (6, 'Comédia de ação');
INSERT INTO `category` VALUES (7, 'Comédia de terror');
INSERT INTO `category` VALUES (8, 'Comédia dramática');
INSERT INTO `category` VALUES (9, 'Comédia romântica');
INSERT INTO `category` VALUES (10, 'Dança');
INSERT INTO `category` VALUES (11, 'Documentário');
INSERT INTO `category` VALUES (12, 'Docuficção');
INSERT INTO `category` VALUES (13, 'Drama');
INSERT INTO `category` VALUES (14, 'Espionagem');
INSERT INTO `category` VALUES (15, 'Faroeste');
INSERT INTO `category` VALUES (16, 'Fantasia');
INSERT INTO `category` VALUES (17, 'Fantasia científica');
INSERT INTO `category` VALUES (18, 'Ficção científica');
INSERT INTO `category` VALUES (19, 'Filmes com truques');
INSERT INTO `category` VALUES (20, 'Filmes de guerra');
INSERT INTO `category` VALUES (21, 'Musical');
INSERT INTO `category` VALUES (22, 'Filme policial');
INSERT INTO `category` VALUES (23, 'Romance');
INSERT INTO `category` VALUES (24, 'Seriado');
INSERT INTO `category` VALUES (25, 'Suspense');
INSERT INTO `category` VALUES (26, 'Terror');
INSERT INTO `category` VALUES (27, 'Thriller');
COMMIT;

-- ----------------------------
-- Table structure for director
-- ----------------------------
DROP TABLE IF EXISTS `director`;
CREATE TABLE `director` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of director
-- ----------------------------
BEGIN;
INSERT INTO `director` VALUES (1, 'James Cameron', '2021-01-04 13:58:53.791382', '2021-01-04 13:58:53.791382');
INSERT INTO `director` VALUES (2, 'Jeff Fowler', '2021-01-04 14:00:02.964515', '2021-01-04 14:00:02.964515');
INSERT INTO `director` VALUES (3, 'Francis Ford Coppola', '2021-01-04 14:02:37.185188', '2021-01-04 14:02:37.185188');
INSERT INTO `director` VALUES (4, 'John McTiernan', '2021-01-04 14:05:09.629138', '2021-01-04 14:05:09.629138');
INSERT INTO `director` VALUES (5, 'Sam Raimi', '2021-01-04 14:06:47.687226', '2021-01-04 14:06:47.687226');
INSERT INTO `director` VALUES (6, 'Steven Spielberg', '2021-01-04 14:09:05.057071', '2021-01-04 14:09:05.057071');
INSERT INTO `director` VALUES (7, 'Juan Bayona', '2021-01-04 14:11:23.145963', '2021-01-04 14:11:23.145963');
INSERT INTO `director` VALUES (8, 'Mel Gibson', '2021-01-04 14:13:22.373609', '2021-01-04 14:13:22.373609');
INSERT INTO `director` VALUES (9, 'Tim Miller', '2021-01-04 14:16:50.614478', '2021-01-04 14:16:50.614478');
INSERT INTO `director` VALUES (10, 'Jill Culton', '2021-01-04 14:18:26.852340', '2021-01-04 14:18:26.852340');
INSERT INTO `director` VALUES (11, 'Adrian Grunberg', '2021-01-04 14:20:54.169202', '2021-01-04 14:20:54.169202');
INSERT INTO `director` VALUES (12, 'Walter Salles', '2021-01-04 14:23:00.566341', '2021-01-04 14:23:00.566341');
INSERT INTO `director` VALUES (13, 'Abdellatif Kechiche', '2021-01-04 14:25:03.982699', '2021-01-04 14:25:03.982699');
INSERT INTO `director` VALUES (14, 'Dean Deblois', '2021-01-04 14:26:50.428773', '2021-01-04 14:26:50.428773');
INSERT INTO `director` VALUES (15, 'Stephen Sommers', '2021-01-04 14:28:15.828302', '2021-01-04 14:28:15.828302');
INSERT INTO `director` VALUES (16, 'Andrew Adamson', '2021-01-04 14:29:28.599854', '2021-01-04 14:29:28.599854');
INSERT INTO `director` VALUES (17, 'Darren Aronofsky', '2021-01-04 14:31:10.288272', '2021-01-04 14:31:10.288272');
INSERT INTO `director` VALUES (18, 'Perry Lang', '2021-01-04 14:33:17.491981', '2021-01-04 14:33:17.491981');
COMMIT;

-- ----------------------------
-- Table structure for movie
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_category` int NOT NULL,
  `id_director` int NOT NULL,
  `picture_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `amount` int NOT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_movie_director` (`id_director`),
  KEY `FK_movie_category` (`id_category`),
  CONSTRAINT `FK_92e246fa4df9da8424f76a8c447` FOREIGN KEY (`id_director`) REFERENCES `director` (`id`),
  CONSTRAINT `FK_a7be4fa8fcc8ba5b880db8c9bfb` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of movie
-- ----------------------------
BEGIN;
INSERT INTO `movie` VALUES (1, 13, 1, NULL, 'Titanic', 1997, 7, '2021-01-04 13:59:00.187381', '2021-01-04 13:59:00.187381', 'A bordo do luxuoso transatlântico, Rose (Kate Winslet), uma jovem da alta sociedade, se sente pressionada com a vida que leva. Ao conhecer Jack (Leonardo DiCaprio), um artista pobre e aventureiro, os dois se apaixonam. Mas eles terão que enfrentar um desafio ainda maior que o preconceito social com o destino trágico do navio.');
INSERT INTO `movie` VALUES (2, 2, 2, NULL, 'Sonic: O Filme', 2020, 10, '2021-01-04 14:01:23.709743', '2021-01-04 14:01:23.709743', 'Ao fugir de uma tribo inimiga, o porco-espinho Sonic (Ben Schwartz) acaba teletransportado para a Terra por meio de um portal. Após acidentalmente causar uma pane elétrica em todo o Noroeste dos EUA, ele precisa se juntar com o policial Tom Wachowski (James Marsden) para fugir dos planos malignos do cientista dr. Robotnik (Jim Carrey).');
INSERT INTO `movie` VALUES (3, 13, 3, NULL, 'O Poderoso Chefão', 1972, 5, '2021-01-04 14:03:29.325879', '2021-01-04 14:03:29.325879', 'Don Corleone (Marlon Brando) é chefe de uma das famílias de mafiosos italianos mais respeitadas de Nova York. Quando ele é ferido e afastado de suas funções, o filho Michael (Al Pacino) deve tomar as rédeas da situação para acabar com o responsável e manter a honra do pai intacta. Dirigido por Francis Ford Coppola e vencedor de três Oscars, incluindo o de Melhor Filme.');
INSERT INTO `movie` VALUES (4, 1, 4, NULL, 'Duro De Matar', 1988, 5, '2021-01-04 14:06:00.683598', '2021-01-04 14:06:00.683598', 'O policial nova-iorquino John McClane (Bruce Willis) vai a Los Angeles para passar o natal com sua esposa. Mas ele não esperava que fosse ser o único que pode deter o grupo de terroristas que invadiu o prédio Nakatomi Plaza, mantendo a todos, incluindo sua amada, como reféns.');
INSERT INTO `movie` VALUES (5, 1, 5, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27186901.jpg%27&ImageUrl=%27186901.jpg%27&EntityType=%27Item%27&EntityId=%2712939%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'Homem-Aranha', 2002, 5, '2021-01-04 14:08:04.540792', '2021-01-04 14:08:04.540792', 'O tímido Peter Parker leva uma vida simples ao lado dos amigos Mary Jane e Harry. De repente, ele é picado por uma aranha que o transforma em um super-herói que está disposto a combater o mal. Mas a situação se complica quando o pai de seu colega, Norman Osborn, surge como o vilão Duende Verde.');
INSERT INTO `movie` VALUES (6, 2, 6, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27219288.jpg%27&ImageUrl=%27219288.jpg%27&EntityType=%27Item%27&EntityId=%274719%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'Jurassic Park - O Parque Dos Dinossauros', 1993, 7, '2021-01-04 14:10:33.030850', '2021-01-04 14:10:33.030850', 'Com o auxílio da engenharia genética criada pelos doutores Alan (Sam Neill), Ellie (Laura Dern) e Ian, um milionário traz à vida dinossauros extintos há milhares de anos, criando um imenso parque em uma remota ilha. Porém, os gigantes pré-históricos começam a ameaçar a vida dos vistitantes. Vencedor de 3 Oscars, incluindo o de Melhores Efeitos Visuais.');
INSERT INTO `movie` VALUES (7, 2, 7, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27210131.jpg%27&ImageUrl=%27210131.jpg%27&EntityType=%27Item%27&EntityId=%277067%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'O Impossível', 2012, 2, '2021-01-04 14:12:18.294365', '2021-01-04 14:12:18.294365', 'Baseado na história real de uma família de turistas durante um Tsunami que atingiu o sudeste asiático. Após a destruição causada pela onda gigante, uma mãe (Naomi Watts) tenta sobreviver com seu filho adolescente e reencontrar seu marido (Ewan McGregor) e seus dois filhos pequenos no meio do caos na Tailândia. Indicado ao Oscar de Melhor Atriz.');
INSERT INTO `movie` VALUES (8, 13, 8, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27png%27&Quality=85&ImageId=%27178294.png%27&ImageUrl=%27178294.png%27&EntityType=%27Item%27&EntityId=%276092%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'A Paixão De Cristo', 2004, 9, '2021-01-04 14:15:06.631772', '2021-01-04 14:15:06.631772', 'O filme narra as últimas 12 horas de Jesus Cristo (James Caviezel), que, após ser traído por Judas, é preso e levado para o julgamento de Poncio Pilatos. Sem conseguir encontrar um motivo para sua condenação, ele sofre com a pressão popular, que pede a crucificação de Jesus. Indicado a 3 Oscars, incluindo o de Melhor Fotografia.');
INSERT INTO `movie` VALUES (9, 1, 9, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27219618.jpg%27&ImageUrl=%27219618.jpg%27&EntityType=%27Item%27&EntityId=%2719149%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'O Exterminador do Futuro: Destino Sombrio', 2019, 10, '2021-01-04 14:16:54.965016', '2021-01-04 14:16:54.965016', 'Vinte anos após Sarah (Linda Hamilton) e John Connor pararem uma ameaça Skynet, um exterminador avançado de nome Rev-9 chega à Cidade do México para eliminar Dani Ramos (Natalia Reyes). Já Grace (Mackenzie Davis) é uma soldado cibernética que aparece para protegê-la. Após receberem a ajuda de Sarah durante um ataque do Rev-9, as três se unem para pôr fim de vez à ameaça. Quando suas pistas às levam ao paradeiro de T-800 (Arnold Schwarzenegger), um exterminador fora de combate que desenvolveu autoconsciência, elas não veem outra saída a não ser aceitar a sua ajuda antes que seja tarde demais.');
INSERT INTO `movie` VALUES (10, 2, 10, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27213703.jpg%27&ImageUrl=%27213703.jpg%27&EntityType=%27Item%27&EntityId=%2719043%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'Abominável', 2019, 12, '2021-01-04 14:20:07.812345', '2021-01-04 14:20:07.812345', 'Em Xangai, na China, a jovem Yi (Chloe Bennet) descobre uma criatura branca e gigante no telhado do seu prédio. Ao lado de Jin (Tenzing Norgay Trainor) e Peng (Albert Tsai), a menina apelida o novo amigo de Everest. Juntos, eles embarcam numa aventura repleta de emoção e descobertas para levá-lo de volta para casa');
INSERT INTO `movie` VALUES (11, 1, 11, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27208247.jpg%27&ImageUrl=%27208247.jpg%27&EntityType=%27Item%27&EntityId=%2717589%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'Rambo: Até o Fim', 2019, 15, '2021-01-04 14:21:30.284789', '2021-01-04 14:21:30.284789', 'Quase quarenta anos após o início da saga de John Rambo (Sylvester Stallone), o veterano de guerra tenta viver uma vida tranquila em um rancho. Mas, quando sua sobrinha é sequestrada, ele precisa voltar à ativa para combater um poderoso cartel mexicano. Vendo-se obrigado a reviver a adrenalina do passado, Rambo irá até o fim, mesmo que precise enfrentar antigos traumas.');
INSERT INTO `movie` VALUES (12, 13, 12, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27207532.jpg%27&ImageUrl=%27207532.jpg%27&EntityType=%27Item%27&EntityId=%2715926%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'Central Do Brasil', 1998, 6, '2021-01-04 14:24:12.000000', '2021-01-04 14:23:15.720559', 'Dora (Fernanda Montenegro) escreve cartas para analfabetos na Central do Brasil. Uma de suas clientes tenta reaproximar o filho Josué (Vinícius de Oliveira) do pai, mas morre ao sair da estação. Dora então ajuda a criança encontrar o pai desaparecido.');
INSERT INTO `movie` VALUES (13, 13, 13, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27187714.jpg%27&ImageUrl=%27187714.jpg%27&EntityType=%27Item%27&EntityId=%2710620%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'Azul É A Cor Mais Quente', 2013, 6, '2021-01-04 14:25:19.026202', '2021-01-04 14:25:19.026202', 'A estudante Adèle (Adèle Exarchopoulos) vive em uma fase de autoconhecimento. Quando conhece Emma (Léa Seydoux), uma garota lésbica, ela se sente atraída e as duas começam a passar muito tempo juntas. Com isso, as colegas de Adèle a pressionam sobre sua sexualidade ao passo que o laço com Emma fica cada vez mais forte. Vencedor de 3 Palmas de Ouro no Festival de Cannes.');
INSERT INTO `movie` VALUES (14, 2, 14, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27190682.jpg%27&ImageUrl=%27190682.jpg%27&EntityType=%27Item%27&EntityId=%2711224%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'Como Treinar O Seu Dragão 2', 2014, 8, '2021-01-04 14:26:52.520631', '2021-01-04 14:26:52.520631', 'Anos se passaram desde que os moradores da Ilha de Berk começaram a viver em harmonia com dragões. Certo dia, Soluço (Jay Baruchel) e Fúria da Noite acham uma caverna habitada por dragões nada pacíficos. Além de garantir a paz mais uma vez, a dupla deve proteger seus velhos e novos amigos das mãos do malvado Drago Bludvist. Indicado ao Oscar de Melhor Animação.');
INSERT INTO `movie` VALUES (15, 1, 15, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27207941.jpg%27&ImageUrl=%27207941.jpg%27&EntityType=%27Item%27&EntityId=%2711476%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'A Múmia', 1999, 8, '2021-01-04 14:28:20.277457', '2021-01-04 14:28:20.277457', 'No Egito, Eve é uma arqueóloga que nunca saiu da biblioteca, mas deseja descobrir uma cidade perdida no deserto. Ela conhece Rick, um soldado desertor que sabe a localização. Ao chegarem à cidade, eles despertam a fúria da múmia Imhotep, que deseja reviver sua amada e trazer o Apocalipse à Terra.');
INSERT INTO `movie` VALUES (16, 2, 16, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27png%27&Quality=85&ImageId=%27190622.png%27&ImageUrl=%27190622.png%27&EntityType=%27Item%27&EntityId=%2712082%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'Shrek', 2001, 8, '2021-01-04 14:29:39.871981', '2021-01-04 14:29:39.871981', 'Shrek é um ogro que vive de forma tranquila. Ele perde a sua paz quando um lorde expulsa várias criaturas de suas moradias forçando-as a morar no pântano junto ao ogro. Decidido a ter sua paz de volta, ele terá que achar um meio de se entender com o nobre para tirar as criaturas do seu terreno. Vencedor do Oscar de Melhor Animação.');
INSERT INTO `movie` VALUES (17, 13, 17, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27png%27&Quality=85&ImageId=%27177345.png%27&ImageUrl=%27177345.png%27&EntityType=%27Item%27&EntityId=%274175%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'Cisne Negro', 2010, 8, '2021-01-04 14:31:20.019548', '2021-01-04 14:31:20.019548', 'Bailarina em uma companhia, Nina (Natalie Portman) conseguiu o papel principal em uma adaptação de O Lago dos Cisnes. Dedicada e perfeccionista, ela passa a sofrer com a pressão exigida pelo seu diretor artístico (Vincent Cassel) e com a competição que surge entre ela e sua colega Lily (Mila Kunis). Vencedor do Oscar de Melhor Atriz.');
INSERT INTO `movie` VALUES (18, 13, 18, 'https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27207170.jpg%27&ImageUrl=%27207170.jpg%27&EntityType=%27Item%27&EntityId=%2717684%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540', 'Entrevista Com Deus', 2018, 8, '2021-01-04 14:33:32.991552', '2021-01-04 14:33:32.991552', 'O jornalista Paul Asher (Brenton Thwaites) atua cobrindo religião para o jornal Herald. Após passar um tempo trabalhando no Afeganistão, ele está em busca de algo grandioso mais uma vez. É quando ele se depara com um intrigante senhor (David Strathairn) que diz ser Deus e que está pronto para lhe conceder a entrevista de sua vida.');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_administrator` tinyint NOT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for user_has_movie
-- ----------------------------
DROP TABLE IF EXISTS `user_has_movie`;
CREATE TABLE `user_has_movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_movie` int NOT NULL,
  `id_user` int NOT NULL,
  `returned` tinyint NOT NULL DEFAULT '0',
  `rented_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `returned_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_movie_user` (`id_movie`),
  KEY `FK_user_movie` (`id_user`),
  CONSTRAINT `FK_a513cdb84b5c2c9efe43367d90f` FOREIGN KEY (`id_movie`) REFERENCES `movie` (`id`),
  CONSTRAINT `FK_d37d829a1829ab4ac915733ea70` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_has_movie
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
