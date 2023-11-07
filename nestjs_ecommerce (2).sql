-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 07, 2023 lúc 04:30 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nestjs_ecommerce`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `image`
--

CREATE TABLE `image` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `src` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `image`
--

INSERT INTO `image` (`id`, `createdAt`, `updatedAt`, `src`) VALUES
('171b11f6-0a87-4bcb-bfec-d350e2d12e04', '2023-09-04 07:28:33.026703', '2023-09-04 07:28:33.026703', 'public/uploads/5e2f6819-5e6b-31fd-1c68-2c722ea10725.jpg'),
('2a4d515e-f713-4ee2-ba94-919a80756167', '2023-09-04 07:28:35.245869', '2023-09-04 07:28:35.245869', 'public/uploads/bc606e69-d499-8719-b2a9-65ef9cf28929.jpg'),
('3380863d-e3be-4d61-846a-a166bb13aca4', '2023-10-09 02:13:48.521300', '2023-10-09 02:13:48.521300', 'public/uploads/af250975-593d-20ba-a11f-f8eca2f4240a.png'),
('3ed84332-2b0a-4231-88e9-396d4b970972', '2023-09-04 07:28:30.569549', '2023-09-04 07:28:30.569549', 'public/uploads/833f0fbf-dde6-4e7d-dab6-81f2c400419a.jpg'),
('64fb310b-7fc2-4a0e-9fc9-5c919b771b0a', '2023-10-09 02:18:23.220728', '2023-10-09 02:18:23.220728', 'public/uploads/ce015121-2e9d-37f5-c999-adef63bfaa00.png'),
('7c783216-3ad0-49e5-bdd2-2140607b104d', '2023-10-09 02:18:54.523034', '2023-10-09 02:18:54.523034', 'public/uploads/dbde95f4-1ee6-b827-153a-21bebfe5e6a3.jpg'),
('7cc057d0-ce49-45d6-9d51-8f4f7e5cb43f', '2023-09-05 01:22:49.757553', '2023-09-05 01:22:49.757553', 'public/uploads/9069a4fd-3e52-fadc-2d19-a98dc3ccb020.jpg'),
('8c79545c-4a7a-4e9c-b845-fc7882bf9e03', '2023-09-05 02:21:44.256522', '2023-09-05 02:21:44.256522', 'public/uploads/6aa40678-bff6-a0be-f01f-ff95a18e7373.jpg'),
('e563eda5-14a2-44ca-81c4-a192e9234198', '2023-09-05 01:22:56.750115', '2023-09-05 01:22:56.750115', 'public/uploads/1fe2d505-5fb5-d285-c405-568f79726a5b.jpg'),
('fadd23e5-ab01-4850-9831-b64fbb2e42ff', '2023-09-04 08:15:41.124794', '2023-09-04 08:15:41.124794', 'public/uploads/35a3c4b5-cceb-0819-1f9f-955c135e706a.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1693811932272, 'Init1693811932272'),
(2, 1693812222652, 'UpdateProduct1693812222652'),
(3, 1693812361529, 'UpdateTag1693812361529'),
(4, 1693812840325, 'UpdateTag1693812840325'),
(5, 1693813249581, 'UpdateTag1693813249581'),
(6, 1694049639311, 'CreateProductSimpleTable1694049639311'),
(7, 1694049966318, 'CreateProductSimpleTable1694049966318'),
(8, 1694050147691, 'CreateProductSimpleTable1694050147691'),
(9, 1694052983018, 'CreateProductSimpleTable1694052983018'),
(10, 1696661961388, 'UpdateProduct1696661961388'),
(11, 1696903304329, 'ProductAttribute1696903304329'),
(12, 1696906625884, 'ProductAttribute1696906625884'),
(13, 1698026670456, 'UpdateProductSimpleData1698026670456'),
(14, 1698201068374, 'UpdateProduct1698201068374'),
(15, 1698722839821, 'UpdateUser1698722839821'),
(16, 1698723214644, 'UpdateUser1698723214644'),
(17, 1698723539443, 'UpdateUser1698723539443'),
(18, 1698723926777, 'UpdateUser1698723926777'),
(19, 1698892563787, 'Migration1698892563787'),
(20, 1699068610461, 'Migration1699068610461'),
(21, 1699068906695, 'Migration1699068906695'),
(22, 1699069338393, 'Migration1699069338393'),
(23, 1699323577422, 'Migration1699323577422'),
(24, 1699323614229, 'Migration1699323614229'),
(25, 1699325794098, 'Migration1699325794098');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(255) NOT NULL,
  `shortDescription` varchar(1000) NOT NULL,
  `description` longtext NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `slug` varchar(1000) NOT NULL,
  `imageId` varchar(36) DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'VARIABLE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `createdAt`, `updatedAt`, `name`, `shortDescription`, `description`, `status`, `slug`, `imageId`, `type`) VALUES
('1a004b3e-1380-4a51-b222-86d89a929aa0', '2023-09-04 07:28:43.251522', '2023-11-07 02:27:32.000000', 'Product 1', 'abc123', '<p>zxc</p><p><img src=\"http://localhost:8000/public/uploads/1fe2d505-5fb5-d285-c405-568f79726a5b.jpg\"></p>', 1, 'Product-1', '3ed84332-2b0a-4231-88e9-396d4b970972', 'simpleData'),
('31aabdfa-636f-4eba-8922-7cf887472478', '2023-10-09 02:19:23.353233', '2023-10-09 02:51:33.000000', 'Product 3', 'Routes with parameters should be declared after any static paths. This prevents the parameterized paths from intercepting traffic destined for the static paths.\n', '<blockquote>Routes with parameters should be declared after any static paths. This prevents the parameterized paths from intercepting traffic destined for the static paths.</blockquote><p><br></p><p><br></p>', 1, 'product-3', '7c783216-3ad0-49e5-bdd2-2140607b104d', 'simpleData'),
('7fcd6030-122a-4610-b137-13b20ba9b153', '2023-09-05 02:21:47.158304', '2023-10-09 01:38:06.000000', 'Product 2', 'Routes with static paths won\'t work when you need to accept dynamic data as part of the request (e.g., GET /cats/1 to get cat with id 1). In order to define routes with parameters, we can add route parameter tokens in the path of', '<p>Routes with static paths won\'t work when you need to accept&nbsp;dynamic data&nbsp;as part of the request (e.g.,&nbsp;GET /cats/1&nbsp;to get cat with id&nbsp;1). In order to define routes with parameters, we can add route parameter&nbsp;tokens&nbsp;in the path of the route to capture the dynamic value at that position in the request URL. The route parameter token in the&nbsp;@Get()&nbsp;decorator example below demonstrates this usage. Route parameters declared in this way can be accessed using the&nbsp;@Param()&nbsp;decorator, which should be added to the method signature.</p><p><br></p>', 1, 'product-2-bd028705-5a70-c0ea-45ee-5ca42123045e-f3b71b1c-a633-2875-5560-d41522944796', '8c79545c-4a7a-4e9c-b845-fc7882bf9e03', 'simpleData'),
('b9fb1b5b-e8c7-4919-8e31-04ffafbb78ec', '2023-11-07 03:22:32.264018', '2023-11-07 03:22:32.264018', 'AAA', '', '', 1, '', NULL, 'VARIABLE');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_attribute`
--

CREATE TABLE `product_attribute` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_attribute_value`
--

CREATE TABLE `product_attribute_value` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `imageId` varchar(36) DEFAULT NULL,
  `productAttributeId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_categories_product_category`
--

CREATE TABLE `product_categories_product_category` (
  `productId` varchar(36) NOT NULL,
  `productCategoryId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_categories_product_category`
--

INSERT INTO `product_categories_product_category` (`productId`, `productCategoryId`) VALUES
('1a004b3e-1380-4a51-b222-86d89a929aa0', '0b58a4c6-4af5-11ee-b901-00155dc41d3f'),
('31aabdfa-636f-4eba-8922-7cf887472478', '0b58a4c6-4af5-11ee-b901-00155dc41d3f'),
('7fcd6030-122a-4610-b137-13b20ba9b153', '0b58a4c6-4af5-11ee-b901-00155dc41d3f');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_category`
--

CREATE TABLE `product_category` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(255) NOT NULL,
  `slug` varchar(1000) NOT NULL,
  `description` longtext NOT NULL,
  `imageId` varchar(36) DEFAULT NULL,
  `parentId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_category`
--

INSERT INTO `product_category` (`id`, `createdAt`, `updatedAt`, `name`, `slug`, `description`, `imageId`, `parentId`) VALUES
('0b58a4c6-4af5-11ee-b901-00155dc41d3f', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 'Shirt', 'Shirt', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_gallery_image`
--

CREATE TABLE `product_gallery_image` (
  `productId` varchar(36) NOT NULL,
  `imageId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_gallery_image`
--

INSERT INTO `product_gallery_image` (`productId`, `imageId`) VALUES
('1a004b3e-1380-4a51-b222-86d89a929aa0', '171b11f6-0a87-4bcb-bfec-d350e2d12e04'),
('1a004b3e-1380-4a51-b222-86d89a929aa0', '2a4d515e-f713-4ee2-ba94-919a80756167');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_option`
--

CREATE TABLE `product_option` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(255) NOT NULL,
  `position` int(11) NOT NULL,
  `values` text NOT NULL,
  `productId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_option`
--

INSERT INTO `product_option` (`id`, `createdAt`, `updatedAt`, `name`, `position`, `values`, `productId`) VALUES
('977431ad-5270-4524-ae2a-e6850eb937f7', '2023-11-07 03:30:24.805638', '2023-11-07 03:30:24.000000', 'color', 2, 'black,red', '1a004b3e-1380-4a51-b222-86d89a929aa0'),
('fd5b6772-ea11-4c5c-9ebf-dbccc5c697d3', '2023-11-07 03:30:24.794066', '2023-11-07 03:30:24.000000', 'size', 1, 's,l', '1a004b3e-1380-4a51-b222-86d89a929aa0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_simple_data`
--

CREATE TABLE `product_simple_data` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `regularPrice` bigint(20) NOT NULL DEFAULT 0,
  `salePrice` bigint(20) NOT NULL DEFAULT 0,
  `salePriceFrom` date DEFAULT NULL,
  `salePriceTo` date DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `stockStatus` int(11) NOT NULL DEFAULT 1,
  `soldIndividually` tinyint(4) NOT NULL DEFAULT 0,
  `weight` float DEFAULT NULL,
  `length` float DEFAULT NULL,
  `width` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `productId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_tag`
--

CREATE TABLE `product_tag` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_tag`
--

INSERT INTO `product_tag` (`id`, `createdAt`, `updatedAt`, `name`) VALUES
('be490d08-4afb-11ee-b901-00155dc41d3f', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 'New'),
('be492c70-4afb-11ee-b901-00155dc41d3f', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 'Hot');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_tags_product_tag`
--

CREATE TABLE `product_tags_product_tag` (
  `productId` varchar(36) NOT NULL,
  `productTagId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_tags_product_tag`
--

INSERT INTO `product_tags_product_tag` (`productId`, `productTagId`) VALUES
('1a004b3e-1380-4a51-b222-86d89a929aa0', 'be492c70-4afb-11ee-b901-00155dc41d3f'),
('31aabdfa-636f-4eba-8922-7cf887472478', 'be492c70-4afb-11ee-b901-00155dc41d3f'),
('7fcd6030-122a-4610-b137-13b20ba9b153', 'be490d08-4afb-11ee-b901-00155dc41d3f');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_variant`
--

CREATE TABLE `product_variant` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `sku` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `downloadable` tinyint(4) NOT NULL DEFAULT 0,
  `isVirtual` tinyint(4) NOT NULL DEFAULT 0,
  `isManageStock` tinyint(4) NOT NULL DEFAULT 0,
  `regularPrice` bigint(20) NOT NULL DEFAULT 0,
  `salePrice` bigint(20) NOT NULL DEFAULT 0,
  `salePriceFrom` date DEFAULT NULL,
  `salePriceTo` date DEFAULT NULL,
  `soldIndividually` tinyint(4) NOT NULL DEFAULT 0,
  `stock` int(11) DEFAULT NULL,
  `stockStatus` int(11) NOT NULL DEFAULT 1,
  `weight` float DEFAULT NULL,
  `length` float DEFAULT NULL,
  `width` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `productId` varchar(36) DEFAULT NULL,
  `imageId` varchar(36) DEFAULT NULL,
  `option1` varchar(255) DEFAULT NULL,
  `option2` varchar(255) DEFAULT NULL,
  `option3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_variant`
--

INSERT INTO `product_variant` (`id`, `createdAt`, `updatedAt`, `sku`, `status`, `downloadable`, `isVirtual`, `isManageStock`, `regularPrice`, `salePrice`, `salePriceFrom`, `salePriceTo`, `soldIndividually`, `stock`, `stockStatus`, `weight`, `length`, `width`, `height`, `productId`, `imageId`, `option1`, `option2`, `option3`) VALUES
('87beb0f7-7d68-4971-93d9-ce915af39a2b', '2023-11-07 03:30:24.816403', '2023-11-07 03:30:24.000000', 'SKU399', 1, 0, 0, 1, 100000, 80000, '2023-11-09', '2023-11-29', 0, 200, 1, 10, 50, 50, 50, '1a004b3e-1380-4a51-b222-86d89a929aa0', NULL, 's', 'black', NULL),
('9fe5e6c8-5558-4f00-8b9c-ddef978f3915', '2023-11-07 03:30:24.822155', '2023-11-07 03:30:24.000000', 'SKU319', 1, 0, 0, 1, 100000, 80000, '2023-11-09', '2023-11-19', 0, 200, 1, 10, 50, 50, 50, '1a004b3e-1380-4a51-b222-86d89a929aa0', NULL, 's', 'red', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_variation`
--

CREATE TABLE `product_variation` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `sku` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `downloadable` tinyint(4) NOT NULL DEFAULT 0,
  `isVirtual` tinyint(4) NOT NULL DEFAULT 0,
  `isManageStock` tinyint(4) NOT NULL DEFAULT 0,
  `regularPrice` bigint(20) NOT NULL DEFAULT 0,
  `salePrice` bigint(20) NOT NULL DEFAULT 0,
  `salePriceFrom` date DEFAULT NULL,
  `salePriceTo` date DEFAULT NULL,
  `soldIndividually` tinyint(4) NOT NULL DEFAULT 0,
  `stock` int(11) DEFAULT NULL,
  `stockStatus` int(11) NOT NULL DEFAULT 1,
  `weight` float DEFAULT NULL,
  `length` float DEFAULT NULL,
  `width` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `productId` varchar(36) DEFAULT NULL,
  `imageId` varchar(36) DEFAULT NULL,
  `productAttributeValue1Id` varchar(36) DEFAULT NULL,
  `productAttributeValue2Id` varchar(36) DEFAULT NULL,
  `productAttributeValue3Id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `permissions` text NOT NULL,
  `roles` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `createdAt`, `updatedAt`, `name`, `email`, `password`, `permissions`, `roles`) VALUES
('8167a330-4af3-11ee-b901-00155dc41d3f', '0000-00-00 00:00:00.000000', '2023-10-31 09:46:26.000000', 'admin', 'admin@gmail.com', '$2a$12$fzbCHPVt62Cx.VvUDdJFdOEPPaDOmh0qTEnU0/ofPnhKKgNDTB/1S', 'PRODUCT_MANAGE,PRODUCT_CREATE', 'ADMIN');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_b1b332c0f436897f21a960f26c` (`imageId`),
  ADD UNIQUE KEY `IDX_8cfaf4a1e80806d58e3dbe6922` (`slug`) USING HASH;

--
-- Chỉ mục cho bảng `product_attribute`
--
ALTER TABLE `product_attribute`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_05d080e931ec850c1e0219ee11` (`name`);

--
-- Chỉ mục cho bảng `product_attribute_value`
--
ALTER TABLE `product_attribute_value`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_ff7b9c5d9302d5313d43d799d3` (`imageId`),
  ADD KEY `FK_c711bba5afd50a326a70865bfa3` (`productAttributeId`);

--
-- Chỉ mục cho bảng `product_categories_product_category`
--
ALTER TABLE `product_categories_product_category`
  ADD PRIMARY KEY (`productId`,`productCategoryId`),
  ADD KEY `IDX_37c2bc279249bec81521f8fe89` (`productId`),
  ADD KEY `IDX_8862dee67b712ea20963c464e8` (`productCategoryId`);

--
-- Chỉ mục cho bảng `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_f38e86bd280ff9c9c7d9cb7839` (`imageId`),
  ADD UNIQUE KEY `IDX_d7cf9c55e1fc04c672ce0f524b` (`slug`) USING HASH,
  ADD KEY `FK_569b30aa4b0a1ad42bcd30916aa` (`parentId`);

--
-- Chỉ mục cho bảng `product_gallery_image`
--
ALTER TABLE `product_gallery_image`
  ADD PRIMARY KEY (`productId`,`imageId`),
  ADD KEY `IDX_daea0f368d3f613870971323c3` (`productId`),
  ADD KEY `IDX_c0aa6061f3ea7d75a6f6466d35` (`imageId`);

--
-- Chỉ mục cho bảng `product_option`
--
ALTER TABLE `product_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2ca1aab0a82e9c0058d8465ad02` (`productId`);

--
-- Chỉ mục cho bảng `product_simple_data`
--
ALTER TABLE `product_simple_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_fd9ec8fbc06e684b47369ba364` (`productId`),
  ADD UNIQUE KEY `REL_fd9ec8fbc06e684b47369ba364` (`productId`);

--
-- Chỉ mục cho bảng `product_tag`
--
ALTER TABLE `product_tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_df61892edc20a1f3cc889c4754` (`name`);

--
-- Chỉ mục cho bảng `product_tags_product_tag`
--
ALTER TABLE `product_tags_product_tag`
  ADD PRIMARY KEY (`productId`,`productTagId`),
  ADD KEY `IDX_d60d217a0b4eae73027a3d7e9f` (`productId`),
  ADD KEY `IDX_193456ebc5cb26486946cea095` (`productTagId`);

--
-- Chỉ mục cho bảng `product_variant`
--
ALTER TABLE `product_variant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_b83f23626741630a8629960715` (`imageId`),
  ADD KEY `FK_6e420052844edf3a5506d863ce6` (`productId`);

--
-- Chỉ mục cho bảng `product_variation`
--
ALTER TABLE `product_variation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_e406b1dcd62e293cf311347164` (`imageId`),
  ADD KEY `FK_9eb6ebb27c4efb410d7a89670b5` (`productId`),
  ADD KEY `FK_ca9621c237c371f80514bc2f77b` (`productAttributeValue1Id`),
  ADD KEY `FK_b96615197baaa18bb5cf4d15b03` (`productAttributeValue2Id`),
  ADD KEY `FK_2bf3cfe8a26d6453ab9932ce0f7` (`productAttributeValue3Id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_b1b332c0f436897f21a960f26c7` FOREIGN KEY (`imageId`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_attribute_value`
--
ALTER TABLE `product_attribute_value`
  ADD CONSTRAINT `FK_c711bba5afd50a326a70865bfa3` FOREIGN KEY (`productAttributeId`) REFERENCES `product_attribute` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ff7b9c5d9302d5313d43d799d33` FOREIGN KEY (`imageId`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_categories_product_category`
--
ALTER TABLE `product_categories_product_category`
  ADD CONSTRAINT `FK_37c2bc279249bec81521f8fe89b` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_8862dee67b712ea20963c464e88` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `FK_569b30aa4b0a1ad42bcd30916aa` FOREIGN KEY (`parentId`) REFERENCES `product_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f38e86bd280ff9c9c7d9cb78393` FOREIGN KEY (`imageId`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_gallery_image`
--
ALTER TABLE `product_gallery_image`
  ADD CONSTRAINT `FK_c0aa6061f3ea7d75a6f6466d354` FOREIGN KEY (`imageId`) REFERENCES `image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_daea0f368d3f613870971323c38` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_option`
--
ALTER TABLE `product_option`
  ADD CONSTRAINT `FK_2ca1aab0a82e9c0058d8465ad02` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_simple_data`
--
ALTER TABLE `product_simple_data`
  ADD CONSTRAINT `FK_fd9ec8fbc06e684b47369ba3645` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_tags_product_tag`
--
ALTER TABLE `product_tags_product_tag`
  ADD CONSTRAINT `FK_193456ebc5cb26486946cea0958` FOREIGN KEY (`productTagId`) REFERENCES `product_tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d60d217a0b4eae73027a3d7e9f3` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_variant`
--
ALTER TABLE `product_variant`
  ADD CONSTRAINT `FK_6e420052844edf3a5506d863ce6` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b83f23626741630a86299607156` FOREIGN KEY (`imageId`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_variation`
--
ALTER TABLE `product_variation`
  ADD CONSTRAINT `FK_2bf3cfe8a26d6453ab9932ce0f7` FOREIGN KEY (`productAttributeValue3Id`) REFERENCES `product_attribute_value` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9eb6ebb27c4efb410d7a89670b5` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b96615197baaa18bb5cf4d15b03` FOREIGN KEY (`productAttributeValue2Id`) REFERENCES `product_attribute_value` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ca9621c237c371f80514bc2f77b` FOREIGN KEY (`productAttributeValue1Id`) REFERENCES `product_attribute_value` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e406b1dcd62e293cf3113471642` FOREIGN KEY (`imageId`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
